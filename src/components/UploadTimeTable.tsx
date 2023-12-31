/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { parseAndReturn, uploadText } from "../utils/apicalls";
import "./../styles/logedin.css";
import { useAuthStore } from "../store/authStore";

const Upload: React.FC = () => {
  const [text, setText] = useState("");
  const { username, token, uploadTimetable } = useAuthStore();

  const submitText = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    if (text === "") {
      alert("Please paste the text first!");
      return;
    }
    parseAndReturn(text, token)
      .then((res: any) => {
        console.log(res.data);
        if (res.data.timetable === null) {
          alert("upload failed");
          return;
        } else {
          uploadText(res.data.timetable, token, username||'')
            .then((res: any) => {
              console.log(res);
              if (res.data.detail !== null) {
                uploadTimetable(res.data.timetable);
              } else {
                alert("upload failed");
              }
            })
            .catch((error: Error) => {
              console.error("Error uploading timetable:", error);
            });
        }
        // uploadTimetable(res.data);
        // console.log(res.data);
      })
      .catch((error: Error) => {
        console.error("Error fetching timetable:", error);
      });
  };

  return (
    <div className="upload-wrapper">
      <h1>Upload Timetable</h1>
      <div className="upload">
        <div className="upload-text">
          <ol className="steps">
            <li>Go to the Time Table tab on VTOP</li>
            <li>Scroll down to see the table with your schedule</li>
            <li>
              Select the text from <span>Theory</span> in the top left to{" "}
              <span>L94</span> in the bottom right
            </li>
            <li>Copy all of the selected text</li>
            <li>Paste it below </li>
            <textarea
              autoFocus
              //   type="text"
              id="input-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <li>Submit to continue! :)</li>
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
