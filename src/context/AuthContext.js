import React, { useContext, useEffect, useState } from "react";
import { auth, firebase } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return firebase.createUserWithEmailAndPassword(auth, email, password);
  }

  function signIn(email, password) {
    return firebase.signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return firebase.signOut(auth);
  }

  function updatePassword(password) {
    return firebase.updatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signIn,
    logOut,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
