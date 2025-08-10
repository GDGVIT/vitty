/* eslint-disable react-hooks/exhaustive-deps */
import { checkUserExists, getToken } from "../utils/apicalls";
import { useEffect, useState } from "react";
import GetUserName from "../components/GetUserName"
import Timetable from "./TimeTable";
import { useAuthStore } from "../store/authStore";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { uuid, username, updateToken, updateUsername, token, campus, updateCampus } = useAuthStore();
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState<boolean>(false);
  useEffect(() => {
    if(uuid === "") return;
    checkUserExists(uuid).then((res) => {
      if (res.detail === "User does not exist") {
        updateUsername("");
      } else {
        getToken(uuid).then((data) => {
            if (data) {
                updateUsername(data.username);
                updateToken(data.token);
                if(data.campus) {
                    updateCampus(data.campus);
                }
                setUserExists(true);
            } else {
            }
            }
        );
      }
    });
  }, [uuid]);
  return (
    <div className="h-full w-full">
      {
        username === null ? (
          <Loader />
        ) : username === "" ? (
          <GetUserName userExists={userExists}/>
        ) : campus == null ? (
          <GetUserName userExists={true}/>
        ) : (
          <Timetable />
        )
      }
    </div>
  );
}
