import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import {  
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyS3dj54g1llhOsItE2ropKnNHoCmF2oI",
    authDomain: "ecom-app-beff5.firebaseapp.com",
    projectId: "ecom-app-beff5",
    storageBucket: "ecom-app-beff5.appspot.com",
    messagingSenderId: "286811656736",
    appId: "1:286811656736:web:7fe1664e61a0fb02bfa245"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
      const userDocRef = doc(db, 'users', userAuth.uid);
      console.log(userDocRef);
      
      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot)

      if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
      }

      return userDocRef;



      //if user data does not exist
      //create/set the document with the data from userAuth in my collection
  }
