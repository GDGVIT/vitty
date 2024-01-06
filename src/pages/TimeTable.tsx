/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthStore } from "../store/authStore";
import { getTimetable } from "../utils/apicalls";
import { useEffect } from "react";
import EditTimeTable from "../components/EditTimeTable";
import UploadTimeTable from "../components/UploadTimeTable";
import ReviewTimeTable from "../components/ReviewTimeTable";

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
  [day: string]: ClassInfo[] | null;
}

export default function Timetable() {
  const { username, token, timetable, uploadTimetable, deleteTimetable, review } = useAuthStore();

  useEffect(() => {
    getTimetable(username || "", token)
      .then((res) => {
        if (res.data.Monday === undefined) {
          deleteTimetable();
          console.log(res, "upload timetable from timetable page");
        }
        else {
          console.log(res.length, "res length")
          uploadTimetable(res.data);
          console.log(res.data, "upload timetable from timetable page");
        }
      })
      .catch((error) => {
        console.error("Error fetching timetable:", error);
      });
  }, [username, token]);

  return (review === false) ? ((timetable === null) ? <UploadTimeTable /> : <EditTimeTable />): <ReviewTimeTable />;
}
