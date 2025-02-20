import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "./Firebase.init";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(true);
        const res = await axios.post(
          `${import.meta.env.VITE_APIURL}/jwt`,
          { email: currentUser?.email }
          // { withCredentials: true }
        );

        localStorage.setItem("token", res.data.token);
        const { data } = await axios.post(
          `${import.meta.env.VITE_APIURL}/users`,
          {
            email: currentUser.email,
            name: currentUser.displayName,
            imageUrl: currentUser.photoURL,
            role: "User",
          }
        );
        setUser({ ...currentUser, userDB: { ...data } });
      } else {
        localStorage.removeItem("token");
        // await axios.post(
        //   `${import.meta.env.VITE_APIURL}/logout`,
        //   {},
        //   { withCredentials: true }
        // );
      }

      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
