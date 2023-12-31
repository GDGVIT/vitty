/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { isAvailable, signIn } from "../utils/apicalls";
import { useAuthStore } from "../store/authStore";
import { useLoadingStore } from "../store/useLoadingStore";

const GetUsername: React.FC = () => {
  const [userName, setuserName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [validregNo, setValidRegNo] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const regexPattern = /^\d{2}[A-Z]{3}\d{4}$/;
  const uuid = localStorage.getItem("uuid") || "";
  const { updateUsername, updateToken } = useAuthStore();
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    document.title = "VITTY | Get Username";
    setLoading(false);
  }, [setLoading]);

  const updateUserName = (): void => {
    console.log("in update username");
    signIn(uuid, userName, regNo).then((data) => {
      if (data) {
        console.log(data);
        updateUsername(userName);
        updateToken(data.access_token);
      } else {
        window.alert("Some error occured");
      }
    });
  };

  const validateInput = (e: React.FormEvent): void => {
    e.preventDefault();

    if (regexPattern.test(regNo)) {
      setValidRegNo(true);
      console.log("valid reg no");
    } else {
      window.alert("Invalid Reg. No.");
      return;
    }

    isAvailable(userName).then((data) => {
      if (data.detail === "Username is valid") {
        setValidUsername(true);
        console.log("valid username");
      } else {
        window.alert(data.detail);
        return;
      }
    });
  };

  useEffect(() => {
    if (validUsername && validregNo) {
      updateUserName();
    }
  }, [validUsername, validregNo]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className="overflow-hidden flex flex-col items-center justify-center overflow-y-hidden p-10 mx-auto h-full">
      <h1 className="overflow-visible text-2xl mb-10">Enter your Details</h1>
      <div className="flex flex-col items-center justify-center w-[50vw] md:w-[20vw] h-90vh">
        <input
          autoFocus
          type="text"
          id="input-text"
          value={userName}
          placeholder="Username"
          onChange={(e) => setuserName(e.target.value)}
          className="box-border text-lg font-poppins rounded-md text-black p-3 pl-4 border-2 border-blue bg-dark w-full mb-3 text-left"
        />
        <input
          type="text"
          id="input-text"
          value={regNo}
          placeholder="Reg. Number"
          autoCapitalize="true"
          onChange={(e) => setRegNo(e.target.value)}
          className="box-border text-lg font-poppins rounded-md text-black p-3 pl-4 border-2 border-blue bg-dark w-full mb-3 text-left"
        />
        <div
          id="button-wrap"
          className="flex justify-center items-center w-full mt-4"
        >
          <button
            className="text-sm font-poppins rounded-md text-light p-3 pl-4 bg-blue-500 border-none font-bold mt-10 focus:outline-none hover:cursor-pointer hover:scale-102"
            onClick={validateInput}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetUsername;
