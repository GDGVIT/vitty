/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { parseAndReturn, uploadText } from "../utils/apicalls";
import "./../styles/logedin.css";
import { useAuthStore } from "../store/authStore";
import { useLoadingStore } from "../store/useLoadingStore";
import { useTimeTableStore, TimeTable } from "../store/TimeTableStore";
import toast from "react-hot-toast";

const Upload: React.FC = () => {
  const [text, setText] = useState("");
  const { token, campus } = useAuthStore();
  const { setDraft, setReview } = useTimeTableStore();
  const { setLoading } = useLoadingStore();
  // const regexPattern = /Registered and Approved$/;

  useEffect(() => {
    document.title = "VITTY | Upload";
    setLoading(false);
  }, [setLoading]);

  const submitText = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    if (text === "") {
      toast.error("Please paste the text first!");
      return;
    }
    // if (regexPattern.test(text) === false) {
    //   const proceed = window.confirm(
    //     "Kindly note that this format is outdated. To ensure the accurate transfer of all timetable details, please refer to the GIF and upload the text copied from the first table you see on VTOP->Timetable. Do you want to proceed anyway?"
    //   );
    // if (!proceed) {
    //   return;
    // }
    // }
    parseAndReturn(text, token, campus ?? "vellore")
      .then((res: TimeTable) => {
        if (res.timetable === null) {
          toast.error("Upload failed: no slots detected. Check the pasted format.");
          return;
        } else {
          setDraft(res);
          setReview(true);
        }
      })
      .catch(() => {
        toast.error("Error parsing timetable. Please try again.");
      });
  };

  return (
    <div className="upload-wrapper">
      <h1>Upload Timetable</h1>
      <div className="upload">
        <div className="upload-text">
          <ol className="steps">
            <img
              src="/copying_timetable.gif"
              className="w-fit max-w-[90vw] md:max-w-[500px] mb-8"
              alt="gif"
            />
            <li>Go to the Time Table tab on VTOP</li>
            <li>Scroll to see the course list with your faculty details</li>
            <li>
              Select the text from <span>Sl.No</span> in the top left to{" "}
              <span>Registered and Approved</span> in the bottom right
            </li>
            <li>Copy all of the selected text</li>
            <li>Paste it below </li>
            {/* <li>Refer to the GIF below</li> */}
            <textarea
              autoFocus
              //   type="text"
              id="input-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" onClick={submitText}>
              Submit Text
            </button>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Upload;
