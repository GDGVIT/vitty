/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "../store/authStore";
import { getTimetable } from "../utils/apicalls";
import { useEffect, useState } from "react";
import EditTimeTable from "../components/EditTimeTable";
import UploadTimeTable from "../components/UploadTimeTable";

interface ClassInfo {
  name: string;
  code: string;
  venue: string;
  slot: string;
  type: string;
  start_time: string;
  end_time: string;
}

interface Timetable {
  [day: string]: ClassInfo[];
}

export default function Timetable() {
  const { username, token } = useAuthStore();
  const [timetable, setTimetable] = useState<Timetable | null>(null);

  useEffect(() => {
    getTimetable(username || "", token)
      .then((res) => {
        setTimetable(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching timetable:", error);
        setTimetable(null);
      });
  }, [username, token]);

  return timetable !== null ? (
    <UploadTimeTable />
  ) : (
    <EditTimeTable />
  );
}
