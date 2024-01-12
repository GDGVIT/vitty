import { useState, useEffect } from "react";
import "./../styles/Modal.css";
import { useTimeTableStore } from "../store/TimeTableStore";

interface ModalProps {
  slot: string;
  status: string;
  onClose: () => void;
}

interface Course {
  name: string;
  code: string;
  venue: string;
  slot: string;
  type: string;
  start_time: string | null;
  end_time: string | null;
}

export default function Modal({ slot, status, onClose }: ModalProps) {
  //   const [course, setCourse] = useState<Course | null>(null);
  const [slotAdd, setSlotAdd] = useState("");
  const [courseName, setCourseName] = useState("");
  const [type, setType] = useState("");
  const [code, setCode] = useState("");
  const [venue, setVenue] = useState("");

  const [tip, setTip] = useState<string | undefined>("");
  const { deleteSlot, addCourse } = useTimeTableStore();

  useEffect(() => {
    if (status === "remove") {
      if (slot.match(/[A-G]/) !== null) {
        if (slot.includes("T")) {
          setTip(`Tip: Don't forget to take out ${slot?.slice(1)} as well!`);
        } else
          setTip(`Tip: Don't forget to take out T${String(slot)} as well!`);
      }
    }
    // } else
    //   setTip(
    //     "Tip: If the slot already exists, make sure you remove it from the timetable first!"
    //   );
  }, [status, slot]);

  const validInput = (): boolean => {
    if (courseName === "") {
      setTip("Tip: Please enter a course name!");
      return false;
    }
    if (code === "") {
      setTip("Tip: Please enter a course code!");
      return false;
    }
    if (type === "") {
      setTip("Tip: Please enter a course type!");
      return false;
    }
    if (venue === "") {
      setTip("Tip: Please enter a venue!");
      return false;
    }
    if (slotAdd === "") {
      setTip("Tip: Please enter a slot!");
      return false;
    }
    if (slotAdd.includes(",") || slotAdd.includes("+")) {
      setTip("Tip: Please enter a valid slot!, Add multiple slots separately!");
      return false;
    }
    if (type !== "Theory" && type !== "Lab") {
      setTip(
        "Tip: Please enter a valid course type! (Theory/Lab), for embedded courses, add Lab and Theory components separately!"
      );
      return false;
    }
    return true;
  };

  const onAddCourse = (): void => {
    if (validInput()) {
      const course: Course = {
        name: courseName,
        code: code,
        type: type,
        venue: venue,
        slot: slotAdd,
        start_time: null,
        end_time: null,
      };
      addCourse(course);
      onClose();
    }
  };

  const onRemove = (): void => {
    deleteSlot(slot);
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{`${status === "remove" ? "Remove" : "Add"}`} Slot</h3>
        </div>
        <div className="modal-body">
          {status === "remove" ? (
            <div className="modal-message">
              Are you sure you want to remove all <span>{slot}</span> slots?
            </div>
          ) : (
            <div className="modal-message">
              Enter course details (
              <span>Web programming-BCSE203E-Theory-SJT210-TAA1</span>)
            </div>
          )}
          {status === "add" && (
            <>
              <br />
              <label className="modal-message">Course Name</label>
              <input
                className="modal-input"
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Web programming"
                required
              />
              <br />
              <label className="modal-message">Course Code</label>
              <input
                className="modal-input"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="BCSE203E"
                required
              />
              <br />
              <label className="modal-message">Slot</label>
              <input
                className="modal-input"
                type="text"
                value={slotAdd}
                onChange={(e) => setSlotAdd(e.target.value)}
                placeholder="TAA1"
                required
              />
              <br />
              <label className="modal-message">Course Type</label>
              <input
                className="modal-input"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Theory"
                required
              />
              <br />
              <label className="modal-message">Venue</label>
              <input
                className="modal-input"
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="SJT323"
                required
              />
            </>
          )}

          <div className="modal-buttons">
            {
              <>
                {status === "add" ? (
                  <button className="modal-yes" onClick={onAddCourse}>
                    Yes
                  </button>
                ) : (
                  <button className="modal-yes" onClick={onRemove}>
                    Yes
                  </button>
                )}
                <button className="modal-no" onClick={onClose}>
                  No
                </button>
              </>
            }
          </div>
          <div className="modal-tip">{tip}</div>
        </div>
      </div>
    </div>
  );
}
