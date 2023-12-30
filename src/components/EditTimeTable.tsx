import React from "react";
import { AiFillEdit } from "react-icons/ai";
import Phone from "./../assets/fin.png";
import Chrome from "./../assets/chrome_store.png";
import Ios from "./../assets/app_store.svg";
import { useAuthStore } from "../store/authStore";

const EditTimeTable: React.FC = () => {
  const { name } = useAuthStore();
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div className="fin-wrapper flex flex-col items-center">
      <h1 className="text-2xl mb-4">
        You're all set
        {name !== "" && name !== undefined && name !== null
          ? `, ${name?.split(" ")[0]}`
          : ""}
        !
      </h1>
      <div className="fin flex justify-around z-1">
        <div className="fin-hero hidden md:block w-1/5">
          <img src={Phone} alt="Download Vitty!" className="w-full" />
        </div>
        <div className="fin-interact flex flex-col items-center">
          <div className="fin-links w-full max-w-xs m-4 p-4 rounded border border-blue-500">
            <p className="text-center mb-4">
              Make sure you never miss another class!
            </p>
            <a
              className="android w-64 m-2"
              href="https://play.google.com/store/apps/details?id=com.dscvit.vitty&utm_source=website&utm_campaign=vitty_website&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            >
              <img
                alt="Get it on Google Play"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                className="w-full"
              />
            </a>
            <a
              className="ios w-64 m-2"
              href="https://apps.apple.com/in/app/vitty-vit-timetable-app/id1611750267"
            >
              <img
                alt="Get it on Apple App Store"
                src={Ios}
                className="w-full"
              />
            </a>
            <a
              className="w-64 m-2"
              href="https://chrome.google.com/webstore/detail/vitty/eeohmkjefmpmddidkjadpifbfcplkifh"
            >
              <img
                alt="Get it on Chrome Web Store"
                src={Chrome}
                className="w-full"
              />
            </a>
          </div>
          <button
            className="fin-edit flex justify-center items-center text-base font-bold rounded m-2 py-3 px-18 bg-bright text-light"
            onClick={handleClick}
          >
            <AiFillEdit className="mr-3" />
            Edit Timetable
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTimeTable;
