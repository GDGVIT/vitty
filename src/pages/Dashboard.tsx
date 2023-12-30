import { checkUserExists, getToken } from "../utils/apicalls";
import { useState, useEffect } from "react";
import GetUserName from "../components/GetUserName"
import Timetable from "./TimeTable";
import { useAuthStore } from "../store/authStore";

export default function Dashboard() {
  const { uuid, updateToken, updateUsername } = useAuthStore();
  const [exists, setExists] = useState(false);
  const [username, ] = useState("");
  useEffect(() => {
    if(uuid === "") return;
    checkUserExists(uuid).then((res) => {
      if (res.detail === "User does not exist") {
        setExists(false);
        console.log(res.detail);
      } else {
        getToken(uuid).then((data) => {
            if (data) {
                updateUsername(data.username);
                updateToken(data.token);
            } else {
                window.alert("Some error occured");
            }
            }
        );
        setExists(true);
        console.log(res.detail);
      }
    });
  }, [username, uuid]);
  return (
    <div className="h-full w-full">
      {exists ? <Timetable/> : <GetUserName />}
    </div>
  );
}
