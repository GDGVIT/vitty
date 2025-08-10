import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiHeadphones, FiTrash } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";

const SUPPORT_EMAIL = "dscvit.vitty@gmail.com";
const GITHUB_ISSUES =
  "https://github.com/GDGVIT/vitty/issues/new?template=bug_report.md";

const SupportFab: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { username, name, email } = useAuthStore();

    const subject = encodeURIComponent("VITTY Support Request");
    const body = encodeURIComponent(`Dear VITTY Support Team,

I would like to report an issue


USER INFORMATION:
- Username: ${username || "{yourUsername}"}
- Name: ${name || "{yourName}"}
- Email: ${email || "{yourEmail}"}

ISSUE DESCRIPTION:


Best regards,
${name || "VITTY User"}
VITTY`);

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
                href={`mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`}
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
                  href="/account/delete"
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
