import { createContext, useState, useEffect } from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from "../utils/firebase/firebase.utils";

//the actual value you want to access
//the defaultValue argument is helpful for testing components in isolation without wrapping them, or testing it with different values from the Provider.
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//index.js imports this
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser }

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) =>{
      console.log(user);
      //user will be null if they sign out
      if(user){
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    })
    return unsubscribe;
  }, []);

  //Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.
  //Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}