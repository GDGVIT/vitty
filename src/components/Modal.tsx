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
  start_time: string;
  end_time: string;
}

export default function Modal({ slot, status, onClose }: ModalProps) {
  //   const [course, setCourse] = useState<Course | null>(null);
  const [slotAdd, setSlotAdd] = useState("");
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

  const onAddCourse = (): void => {
    const [name, code, type, venue, slot, start_time, end_time] =
      slotAdd.split("-");
    const course: Course = {
      name,
      code,
      type,
      venue,
      slot,
      start_time,
      end_time,
    };
    addCourse(course);
    onClose();
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
              Enter course details (<span></span>)
            </div>
          )}
          {status === "add" && (
            <input
              className="modal-input"
              type="text"
              value={slotAdd}
              onChange={(e) => setSlotAdd(e.target.value)}
            />
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
