/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useContext, useEffect, useState } from "react";
// import { getAuth, signOut } from 'firebase/auth'
import VTLogo from "./../assets/landing_logo.png";
import userIcon from "./../assets/icon.png";
// import "./../styles/Nav.css";

const Nav: React.FC = () => {
  return (
    <>
      <div className="flex h-[48px] border-b-blue-800 border-b flex-row w-full justify-between items-center px-8">
          <img src={VTLogo} alt="VT Logo" className="max-h-[50%] w-auto" />
            <img
              src={userIcon}
              alt="User Icon"
              className="h-[32px] w-[32px] rounded-full"
            />
      </div>
    </>
  );
};

export default Nav;
