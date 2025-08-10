/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Template from "./pages/Template";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useAuthStore } from "./store/authStore";
import Profile from "./components/Profile";
import { useShowProfileStore } from "./store/profileStore";

const App: React.FC = () => {
  const { login, setAuthReady } = useAuthStore();
  const { showProfile } = useShowProfileStore();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user1) => {
      if (user1 !== null) {
        login(
          user1.uid,
          user1.photoURL || "",
          user1.displayName || "",
          user1.email || ""
        );
        setAuthReady(true);
      } else {
        setAuthReady(true);
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = "VITTY";
  }, []);

  const location = useLocation();
  return (
    <Template>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#0f2236", color: "#e5eefb", border: "1px solid #1e3a5f" },
          success: { iconTheme: { primary: "#22c55e", secondary: "#0f2236" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#0f2236" } },
        }}
      />
      {showProfile && <Profile />}
    </Template>
  );
};

export default App;
