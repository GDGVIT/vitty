import React from "react";
import Navbar from "../components/Nav";
import EllipseTR from "../assets/ellipse_tr.png";
import EllipseBL from "../assets/ellipse_bl.png";
import SupportFab from "../components/SupportFab";

interface TemplateProps {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <>
      <div className="fixed overflow-hidden opacity-50 ellipse ellipse-tr right-0">
        <img
          className="w-72 overflow-hidden md:w-[35vw]"
          src={EllipseTR}
          alt="Vitty"
        />
      </div>
      <div className="fixed overflow-hidden opacity-50 ellipse ellipse-bl bottom-0 -left-8">
        <img
          className="w-72 overflow-hidden md:w-[35vw]"
          src={EllipseBL}
          alt="Vitty"
        />
      </div>
      <Navbar />
      <div className="h-auto w-auto mt-[96px] bg-[#041727]">{children}</div>
      <SupportFab />
    </>
  );
};

export default Template;
