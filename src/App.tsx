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
  const firebaseConfig = {
    apiKey: "AIzaSyCm61E2xdQgQJGaOupsnEiARFhk2FNmub4",
    authDomain: "vitty-dscvit.firebaseapp.com",
    projectId: "vitty-dscvit",
    storageBucket: "vitty-dscvit.appspot.com",
    messagingSenderId: "272763363329",
    appId: "1:272763363329:web:03c63b25f47d2414e2e000",
    measurementId: "G-8KRDV5SK87",
  };

  initializeApp(firebaseConfig);
  const { initializeFromLocalStorge, login, isLoggedIn, name } = useAuthStore();
  const { showProfile } = useShowProfileStore();
  const { isLoading } = useLoadingStore();
  const uuid = localStorage.getItem("uuid") || "";
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user1) => {
      console.log(user1, "user1");
      if (user1 !== null) {
        console.log(user1);
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
        console.log("user is null from app.tsx");
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
