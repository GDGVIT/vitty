/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import Phone from "./../assets/fin.png";
import Chrome from "./../assets/chrome_store.png";
import Ios from "./../assets/app_store.svg";
import { useAuthStore } from "../store/authStore";
import "./../styles/fin.css";
import { useLoadingStore } from "../store/useLoadingStore";

const EditTimeTable: React.FC = () => {
  const { name, deleteTimetable } = useAuthStore();
  const { setLoading, timetableUploadedThisSession, setTimetableUploadedThisSession } = useLoadingStore();
  const handleClick = () => {
    deleteTimetable();
  };

  useEffect(() => {
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLoading]);

  useEffect(() => {
    if (timetableUploadedThisSession) {
      setTimeout(() => {
        window.alert("Timetable uploaded successfully!");
      }, 1000);
      setTimetableUploadedThisSession(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fin-wrapper">
      <h1>
        You're all set
        {name !== "" && name !== undefined && name !== null
          ? `, ${name?.split(" ")[0]}`
          : ""}
        !
      </h1>
      <div className="fin">
        <div className="fin-hero">
          <img src={Phone} alt="Download Vitty!" />
        </div>
        <div className="fin-interact">
          <div className="fin-links">
            <p>Make sure you never miss another class!</p>
            <a
              className="android"
              href="https://play.google.com/store/apps/details?id=com.dscvit.vitty&utm_source=website&utm_campaign=vitty_website&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            >
              <img
                alt="Get it on Google Play"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              />
            </a>
            <a
              className="ios"
              href="https://apps.apple.com/in/app/vitty-vit-timetable-app/id1611750267"
            >
              <img alt="Get it on Apple App Store" src={Ios} />
            </a>
            <a href="https://chrome.google.com/webstore/detail/vitty/eeohmkjefmpmddidkjadpifbfcplkifh">
              <img alt="Get it on Chrome Web Store" src={Chrome} />
            </a>

            {/* <a href='https://play.google.com/store/apps/details?id=com.dscvit.vitty'><DiAndroid /> Get it on the Play Store</a>
            <a className='disabled' href='/'><FaAppStoreIos /> Get it on the App Store (coming soon)</a>
            <a href='https://chrome.google.com/webstore/detail/vitty/eeohmkjefmpmddidkjadpifbfcplkifh'><FaChrome /> Get it on the Chrome Web Store</a> */}
          </div>
          <button className="fin-edit" onClick={handleClick}>
            <AiFillEdit />
            Edit Timetable
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTimeTable;
