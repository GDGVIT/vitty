/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import LoginPage from "./pages/login";
import Template from "./pages/Template";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Dashboard from "./pages/Dashboard";
import Loader from "./components/Loader";
import { useAuthStore } from "./store/authStore";
import Profile from "./components/Profile";
import { useShowProfileStore } from "./store/profileStore";
import { useLoadingStore } from "./store/useLoadingStore";

const App: React.FC = () => {
  const isDev = import.meta.env.NODE_ENV === 'development';
  
  const firebaseConfig = {
    apiKey: isDev ? import.meta.env.FIREBASE_API_KEY : import.meta.env.FIREBASE_API_KEY_PROD,
    authDomain: isDev ? import.meta.env.FIREBASE_AUTH_DOMAIN : import.meta.env.FIREBASE_AUTH_DOMAIN_PROD,
    projectId: isDev ? import.meta.env.FIREBASE_PROJECT_ID : import.meta.env.FIREBASE_PROJECT_ID_PROD,
    storageBucket: isDev ? import.meta.env.FIREBASE_STORAGE_BUCKET : import.meta.env.FIREBASE_STORAGE_BUCKET_PROD,
    messagingSenderId: isDev ? import.meta.env.FIREBASE_MESSAGING_SENDER_ID : import.meta.env.FIREBASE_MESSAGING_SENDER_ID_PROD,
    appId: isDev ? import.meta.env.FIREBASE_APP_ID : import.meta.env.FIREBASE_APP_ID_PROD,
    measurementId: isDev ? import.meta.env.FIREBASE_MEASUREMENT_ID : import.meta.env.FIREBASE_MEASUREMENT_ID_PROD,
  };

  initializeApp(firebaseConfig);
  const { initializeFromLocalStorge, login, isLoggedIn, name } = useAuthStore();
  const { showProfile } = useShowProfileStore();
  const { isLoading } = useLoadingStore();
  const uuid = localStorage.getItem("uuid") || "";
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user1) => {
      if (user1 !== null) {
        localStorage.setItem("uuid", user1.uid || "");
        localStorage.setItem("profile", user1.photoURL || "");
        localStorage.setItem("name", user1.displayName || "");
        localStorage.setItem("email", user1.email || "");
        login(
          user1.uid,
          user1.photoURL || "",
          user1.displayName || "",
          user1.email || ""
        );
      } else {
        localStorage.setItem("name", "");
        initializeFromLocalStorge();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, login]);

  useEffect(() => {
    initializeFromLocalStorge();
  }, [initializeFromLocalStorge]);

  useEffect(() => {
    document.title = "VITTY";
  }, []);

  return (
    <Template>
      {isLoading ? (
        <Loader />
      ) : uuid === "" ? (
        <LoginPage />
      ) : name === "" ? (
        <Loader />
      ) : (
        <Dashboard />
      )}
      {showProfile && <Profile />}
    </Template>
  );
};

export default App;
