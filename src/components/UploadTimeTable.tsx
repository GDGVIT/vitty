/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { parseAndReturn } from "../utils/apicalls";
import "./../styles/logedin.css";

const Upload: React.FC = () => {
  const [text, setText] = useState("");

  const onParse = (res: any): void => {
    console.log(res.data.timetable);
  };

  const submitText = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    if (text === "") {
      alert("Please paste the text first!");
      return;
    }
    parseAndReturn(text).then(
      (res: unknown) => onParse(res),
      () => alert("Some error occured")
    );
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
            <input
              autoFocus
              type="text"
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
