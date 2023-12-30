/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useContext, useEffect, useState } from "react";
// import { getAuth, signOut } from 'firebase/auth'
import VTLogo from "./../assets/landing_logo.png";
import userIcon from "./../assets/icon.png";
import { useAuthStore } from "../store/authStore";
// import "./../styles/Nav.css";

const Nav: React.FC = () => {
  const { profile, name, logout } = useAuthStore();
  return (
    <>
      <div className="flex h-[48px] border-b-blue-800 border-b flex-row w-full justify-between items-center px-8">
        <img src={VTLogo} alt="VT Logo" className="max-h-[50%] w-auto" />
        <div className="flex flex-row items-center gap-2">
          <img
            src={profile || userIcon}
            alt="User Icon"
            className="h-[32px] w-[32px] rounded-full"
          />
          <span className="text-white font-semibold">{name}</span>
        </div>
      </div>
    </>
  );
};

export default Nav;
