/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import Template from "./pages/Template";
// import GaurdedRoute from "./components/GuardRoute";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Dashboard from "./pages/Dashboard";
// import Loader from "./components/Loader";
import { useAuthStore } from "./store/authStore";
import Timetable from "./pages/TimeTable";

const App: React.FC = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAGsvEIEPrNKNj_0Z5IzoXBCQQAqEQXG48",
    authDomain: "vitty-dev.firebaseapp.com",
    projectId: "vitty-dev",
    storageBucket: "vitty-dev.appspot.com",
    messagingSenderId: "266303676876",
    appId: "1:266303676876:web:6f8926372803145d457d69",
    measurementId: "G-FC84DREEWX",
  };

  const app = initializeApp(firebaseConfig);
  const { initializeFromLocalStorge, login, isLoggedIn } =
    useAuthStore();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user1) => {
      if (user1 !== null) {
        console.log(user1);
        localStorage.setItem("uuid", user1.uid);
        localStorage.setItem("profile", user1.photoURL || "");
        localStorage.setItem("username", user1.displayName || "");
        localStorage.setItem("email", user1.email || "");
        login(user1.uid, user1.photoURL || "", user1.displayName || "");
      } else {
        console.log("user is null");
      }
    });
  }, [isLoggedIn, login]);

  useEffect(() => {
    initializeFromLocalStorge();
  }, [initializeFromLocalStorge]);

  // const logOut = (): void => {
  //   const auth = getAuth()
  //   signOut(auth).then(() => {
  //     console.log(auth.currentUser)
  //     logout
  //   }).catch((error) => {
  //     console.error(error)
  //   })
  // }
  useEffect(() => {
    document.title = "VITTY";
  }, []);
  return (
    <Template>
      {isLoggedIn ? <Dashboard /> : <LoginPage />}
    </Template>
  );
};

export default App;
