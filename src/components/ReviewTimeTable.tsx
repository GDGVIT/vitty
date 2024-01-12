import { useAuthStore, Course } from "../store/authStore";
import ParseAndReturn from "../utils/ParseAndReturn";
import { useEffect, useState } from "react";
import CourseCard from "./Course";
import "../styles/review.css";
import { useTimeTableStore } from "../store/TimeTableStore";
import { uploadText } from "../utils/apicalls";
import Modal from "./Modal";
import "./../styles/Modal.css";

export default function ReviewTimeTable() {
  const { setReview, token, username, uploadTimetable } = useAuthStore();
  const { timetable } = useTimeTableStore();
  const [classes, setClasses] = useState<Course[] | null>(null);
  const [sortedClasses, setSortedClasses] = useState<Course[] | null>(null);
  const [day, setDay] = useState<string>("Monday");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalSlot, setModalSlot] = useState<string>("");
  const [modalStatus, setModalStatus] = useState<string>("");

  const fetchData = async () => {
    const classes: Course[] = ParseAndReturn(timetable, day);
    setClasses(classes);
    console.log(classes, "classes");
  };

  useEffect(() => {
    document.title = "VITTY | Review";
    fetchData();
    console.log(day, "day");
    console.log(timetable, "timetable");
    const sortedClasses = classes?.sort((a, b) => {
      const aTime = convertTo24HourFormat(a.start_time);
      const bTime = convertTo24HourFormat(b.start_time);
      return aTime.localeCompare(bTime);
    });

    setSortedClasses(sortedClasses || null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timetable, day]);

  const handleConfirm = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    if (timetable === null) {
      alert("Please upload the timetable first!");
      return;
    } else {
      // console.log(timetable.timetable, "timetable from upload section");
      uploadText(timetable.timetable, token, username || "")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => {
          console.log(res, "upload text");
          if (res.data.detail !== null) {
            alert("upload successful");

            uploadTimetable(res.data);
            console.log(typeof timetable, "timetable length");
          } else {
            alert("upload failed");
          }
        })
        .catch((error: Error) => {
          console.error("Error uploading timetable:", error);
        });
      setReview(false);
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
              Courses={sortedClasses || null}
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
        <button className="review-confirm" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
      {showModal &&
        <Modal
          onClose={() => setShowModal(false)}
          // getActive={day}
          // resetActive={setDay}
          slot={modalSlot}
          status={modalStatus}
        />}
    </>
  );
}
