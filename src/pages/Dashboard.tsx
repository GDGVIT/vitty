/* eslint-disable react-hooks/exhaustive-deps */
import { checkUserExists, getToken } from "../utils/apicalls";
import { useEffect } from "react";
import GetUserName from "../components/GetUserName"
import Timetable from "./TimeTable";
import { useAuthStore } from "../store/authStore";

export default function Dashboard() {
  const { uuid, username, updateToken, updateUsername, token } = useAuthStore();
  useEffect(() => {
    if(uuid === "") return;
    checkUserExists(uuid).then((res) => {
      if (res.detail === "User does not exist") {
        console.log(res.detail);
      } else {
        getToken(uuid).then((data) => {
            if (data) {
                console.log(data);
                updateUsername(data.username);
                updateToken(data.token);
                localStorage.setItem("email", data.email);
            } else {
                window.alert("Some error occured");
            }
            }
        );
        console.log(res.detail);
      }
    });
  }, [username, token, uuid, updateToken, updateUsername]);
  return (
    <div className="h-full w-full">
      {username ? <Timetable/> : <GetUserName />}
    </div>
  );
}
