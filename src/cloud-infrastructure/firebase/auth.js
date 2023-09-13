import React, { useContext, useState, useEffect } from "react";
import auth, { createUserDoc } from "./firebase";
import {
  getMessagingToken,
  removeToken,
  updateUserNotificationToken,
} from "./notifications/notifications";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  deleteUser,
  signInWithPopup,
  getAdditionalUserInfo,
  GoogleAuthProvider,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [current_user, setCurrentUser] = useState();

  const auth_user = auth.currentUser;

  function successfulSignIn(userCredential, success_callback) {
    console.log("Singed in");
    updateUserNotificationToken(userCredential.user.uid, success_callback).then(
      (r) => {
        console.log("Completed user update.");
      }
    );
    setCurrentUser(userCredential);
  }

  function signIn(email, password, success_callback, failed_callback) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        successfulSignIn(userCredential, success_callback);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        failed_callback(errorCode, errorMessage);
      });
  }

  function signInWithGoogle(
    success_callback_login,
    success_callback_create_account,
    failed_callback
  ) {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Successful sign-in
        console.log("result", result);
        const additionalUserInf = getAdditionalUserInfo(result);
        const isNewUser = additionalUserInf.isNewUser;
        if (!isNewUser) {
          // user is newly created, perform additional actions
          fetchSignInMethodsForEmail(auth, result.user.email)
            .then((providers) => {
              if (providers.length > 0) {
                console.log(
                  "Existing user signed in with Google:",
                  result.user.email
                );
                // handle existing user sign in here
              } else {
                console.log(
                  "User signed in with Google but does not exist in authentication database:",
                  result.user.email
                );
                // handle error here
              }
            })
            .catch((error) => {
              console.error("Error fetching sign in methods for email:", error);
              // handle error here
            });
          successfulSignIn(result, success_callback_login);
        } else {
          console.log("here");
          console.log("Created User", result);
          createUserDoc(result, result.user.email, result.user.displayName)
            .then((userCredential) => {
              console.log("Created user Doc");
              updateUserNotificationToken(
                result.user.uid,
                success_callback_create_account
              )
                .then((r) => {
                  console.log("Completed user update.");
                })
                .catch((error) => {
                  console.log("Failed ot update User Notification Token");
                  success_callback_create_account();
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
        }
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

  async function signOutUser(signedOutSuccessful) {
    const currentToken = getMessagingToken(); // Assuming 'messaging' is initialized
    if (currentToken) {
      removeToken(current_user.uid, currentToken).then(() => {
        console.log("Removed Token Successfully");
      });
    }

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
    signInWithGoogle,
    createAccount,
    signOutUser,
    auth_user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
