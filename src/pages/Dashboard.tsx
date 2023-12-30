import { checkUserExists } from "../utils/apicalls";
import { useState, useEffect } from "react";
import GetUserName from "../components/GetUserName"
export default function Dashboard() {
  const uuid = localStorage.getItem("uuid");
  const [exists, setExists] = useState(false);
  const [username, ] = useState("");
  useEffect(() => {
    if(uuid === "") return;
    checkUserExists(uuid || "").then((res) => {
      if (res.detail === "User does not exist") {
        setExists(false);
        console.log(res.detail);
      }
    });
  }, [username, uuid]);
  return (
    <div className="h-full w-full">
      {exists ? <h1>exists</h1> : <GetUserName />}
    </div>
  );
}
