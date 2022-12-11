import React, { useContext, useState, useEffect } from "react";
import auth, { createUserDoc } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [current_user, setCurrentUser] = useState();

  const auth_user = auth.currentUser;

  function signIn(email, password, success_callback, failed_callback) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        success_callback();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        failed_callback(errorCode, errorMessage);
      });
  }

  function createAccount(
    email,
    password,
    name,
    successful_callback,
    failed_callback
  ) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user_cred) => {
        // Signed in
        // Create user doc for the account
        console.log("here");
        createUserDoc(user_cred, email, name)
          .then((_) => {
            successful_callback();
          })
          .catch((error) => {
            const errorCode = error.code;
            deleteUser(auth.currentUser)
              .then(() => {
                failed_callback(
                  errorCode,
                  "Account Creation Failed - Try Again"
                );
              })
              .catch((error) => {
                failed_callback(
                  error.code,
                  "Please contact support with your email..."
                );
              });
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("User Account not made");
        failed_callback(errorCode, errorMessage);
      });
  }

  function signOutUser(signedOutSuccessful) {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
        signedOutSuccessful();
      })
      .catch((error) => {
        // An error happened.
        console.log(`${error} - sign out failed`);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser();
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    current_user,
    signIn,
    createAccount,
    signOutUser,
    auth_user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
