import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiHeadphones, FiTrash } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";

const SUPPORT_EMAIL = "dscvit.vitty@gmail.com";
const GITHUB_ISSUES =
  "https://github.com/GDGVIT/vitty/issues/new?template=bug_report.md";

const SupportFab: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { username } = useAuthStore();

  return (
    <>
      <div className="flex flex-col items-end">
        <button
          className="text-white rounded-full p-2 flex items-center justify-center hover:scale-105"
          aria-label="Support"
          onClick={() => setOpen(() => true)}
        >
          <FiHeadphones size={24} />
        </button>
      </div>
      {open && (
        <div className="modal" onClick={() => setOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header mb-8">
              <h3>Support</h3>
              <FaTimes onClick={() => setOpen(false)} />
            </div>
            <div className="modal-body flex flex-col gap-2">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                // className="flex items-center gap-2 px-3 py-2 rounded-lg  text-white font-medium transition-colors duration-150"
                className="border-blue-400 border rounded-md flex flex-row items-center justify-center gap-3 p-2 w-full"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <FiHeadphones size={18} />
                Email Support
              </a>
              <a
                href={GITHUB_ISSUES}
                className="border-blue-400 border rounded-md flex flex-row items-center justify-center gap-3 p-2 w-full"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                🐞 Report a Bug
              </a>
              {username && (
                <a
                  href="/?delete=true"
                  // className="flex items-center gap-2 px-3 py-2 rounded-lg  text-white font-medium transition-colors duration-150"
                  className="border-red-600 border rounded-md flex flex-row items-center justify-center gap-3 p-2 w-full"
                  onClick={() => setOpen(false)}
                >
                  <FiTrash size={18} />
                  Delete my Account
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportFab;
