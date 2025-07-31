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
import AccountDelete from "./pages/AccountDelete";

const App: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const deleteParam = urlParams.get("delete");

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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
    document.title = "VITTY";
  }, []);

  return (
    <Template>
      {deleteParam == "true" ? (
        <AccountDelete />
      ) : isLoading ? (
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
