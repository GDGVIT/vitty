/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthStore } from "../store/authStore";
import { getTimetable } from "../utils/apicalls";
import { useEffect } from "react";
import EditTimeTable from "../components/EditTimeTable";
import UploadTimeTable from "../components/UploadTimeTable";
import ReviewTimeTable from "../components/ReviewTimeTable";
import Loader from "../components/Loader";
import { useTimeTableStore } from "../store/TimeTableStore";
import { AnimatePresence, motion } from "framer-motion";

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
  const { username, token } = useAuthStore();
  const { timetable, setTimetable, clearTimetable, review } = useTimeTableStore();

  useEffect(() => {
    getTimetable(username || "", token)
      .then((res) => {
        // API returns an object with day keys when a timetable exists
        if (!res || res.data.Monday === undefined) {
          clearTimetable();
        } else {
          // We only need to know that a timetable exists to show the final screen
          setTimetable({ timetable: [] });
        }
      })
      .catch(() => {
      });
  }, [username, token]);

  const viewKey = review
    ? "review"
    : timetable === null
    ? "loading"
    : timetable.timetable === null
    ? "upload"
    : "edit";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {viewKey === "loading" && <Loader />}
        {viewKey === "upload" && <UploadTimeTable />}
        {viewKey === "edit" && <EditTimeTable />}
        {viewKey === "review" && <ReviewTimeTable />}
      </motion.div>
    </AnimatePresence>
  );
}
