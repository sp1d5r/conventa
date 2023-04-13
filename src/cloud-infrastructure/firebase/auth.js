import React, { useContext, useState, useEffect } from "react";
import auth, { createUserDoc, updateUserNotificationToken } from "./firebase";
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
        console.log("Singed in");
        updateUserNotificationToken(
          userCredential.user.uid,
          success_callback
        ).then((r) => {
          console.log("Completed user update.");
        });
        setCurrentUser(userCredential);
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
        console.log("Created User", user_cred);
        createUserDoc(user_cred, email, name)
          .then((userCredential) => {
            console.log("Created user Doc");
            updateUserNotificationToken(user_cred.user.uid, successful_callback)
              .then((r) => {
                console.log("Completed user update.");
              })
              .catch((error) => {
                console.log("Failed ot update User Notification Token");
                successful_callback();
              });
            setCurrentUser(userCredential);
          })
          .catch((error) => {
            const errorCode = error.code;
            deleteUser(auth.currentUser)
              .then(() => {
                failed_callback(
                  errorCode,
                  `Account Creation Failed - Try Again - ${error}`
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
        setCurrentUser(null);
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
