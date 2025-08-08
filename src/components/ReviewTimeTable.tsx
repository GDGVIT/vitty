import { useAuthStore } from "../store/authStore";
import ParseAndReturn from "../utils/ParseAndReturn";
import { useEffect, useState } from "react";
import CourseCard from "./Course";
import "../styles/review.css";
import { useTimeTableStore, Course } from "../store/TimeTableStore";
import { uploadText } from "../utils/apicalls";
import Modal from "./Modal";
import "./../styles/Modal.css";
import { useLoadingStore } from "../store/useLoadingStore";
import toast from "react-hot-toast";

export default function ReviewTimeTable() {
  const { token, username, campus } = useAuthStore();
  const { draft, setTimetable, setReview } = useTimeTableStore();
  const { setTimetableUploadedThisSession } = useLoadingStore();
  const [classes, setClasses] = useState<Course[] | null>(null);
  const [day, setDay] = useState<string>("Monday");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalSlot, setModalSlot] = useState<string>("");
  const [modalStatus, setModalStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchData = async () => {

    // ParseAndReturn function will return the classes for the selected day from the draft
    const classes: Course[] = ParseAndReturn(draft, day, campus ?? "vellore");
    const sortedClasses = classes.sort((a, b) => {
      const aTime = convertTo24HourFormat(a.start_time || "00:00");
      const bTime = convertTo24HourFormat(b.start_time || "00:00");
      return aTime.localeCompare(bTime);
    });
    setClasses(sortedClasses);
  };
  
  useEffect(() => {
    document.title = "VITTY | Review";
    fetchData();
  }, [draft, day]);
  
  function convertTo24HourFormat(time: string): string {
    const [hour, minute, period] = time.split(/:| /);
    let hour24 = parseInt(hour, 10);

    if (period === "PM" && hour24 < 12) {
      hour24 += 12;
    } else if (period === "AM" && hour24 === 12) {
      hour24 = 0;
    }

    return `${hour24.toString().padStart(2, "0")}:${minute}`;
  }


  const handleConfirm = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    if (draft === null) {
      toast.error("Please upload the timetable first!");
      return;
    } else {
        setIsSubmitting(true);
            
        uploadText(draft.timetable, token, username || "")
        .then((res: any) => {
          if (res?.data?.detail !== null) {
            setTimetable(res.data);
            setTimetableUploadedThisSession(true);
            // leave review mode only after we have updated canonical timetable
            setReview(false);
          } else {
            toast.error("Upload failed");
          }
        })
        .catch(() => {
          toast.error("Error uploading timetable");
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  return (
    <>
      <div className="review-wrapper">
        <h1>Review Timetable</h1>
        <div className="review">
          <div className="review-block">
            <div className="days">
              <div
                className={`day ${day === "Monday" ? "active" : ""}`}
                onClick={() => {
                  setDay("Monday");
                }}
              >
                Mon
              </div>
              <div
                className={`day ${day === "Tuesday" ? "active" : ""}`}
                onClick={() => {
                  setDay("Tuesday");
                }}
              >
                Tue
              </div>
              <div
                className={`day ${day === "Wednesday" ? "active" : ""}`}
                onClick={() => {
                  setDay("Wednesday");
                }}
              >
                Wed
              </div>
              <div
                className={`day ${day === "Thursday" ? "active" : ""}`}
                onClick={() => {
                  setDay("Thursday");
                }}
              >
                Thu
              </div>
              <div
                className={`day ${day === "Friday" ? "active" : ""}`}
                onClick={() => {
                  setDay("Friday");
                }}
              >
                Fri
              </div>
              <div
                className={`day ${day === "Saturday" ? "active" : ""}`}
                onClick={() => {
                  setDay("Saturday");
                }}
              >
                Sat
              </div>
              <div
                className={`day ${day === "Sunday" ? "active" : ""}`}
                onClick={() => {
                  setDay("Sunday");
                }}
              >
                Sun
              </div>
            </div>
            <CourseCard
              Courses={classes}
              setShowModal={setShowModal}
              setModalSlot={setModalSlot}
              setModalStatus={setModalStatus}
            />
          </div>
        </div>
        <button
          className="review-add"
          onClick={() => {
            setShowModal(true);
            setModalStatus("add");
          }}
        >
          Add Slot
        </button>
        <button className="review-confirm" onClick={handleConfirm} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Confirm"}
        </button>
      </div>
      {showModal &&
        <Modal
          onClose={() => setShowModal(false)}
          slot={modalSlot}
          status={modalStatus}
        />}
    </>
  );
}
