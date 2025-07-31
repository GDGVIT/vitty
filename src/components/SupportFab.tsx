import React, { useState } from "react";
import { FiHeadphones } from "react-icons/fi";

const SUPPORT_EMAIL = "dscvit.vitty@gmail.com";
const GITHUB_ISSUES = "https://github.com/GDGVIT/vitty/issues/new?template=bug_report.md";

const SupportFab: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 bg-[#0a1a2f] border-2 border-blue-500 rounded-2xl shadow-2xl p-5 flex flex-col gap-3 animate-fade-in min-w-[220px] max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <FiHeadphones size={22} className="text-blue-400" />
            <span className="font-bold text-blue-300 text-lg">Vitty Support</span>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-150"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <FiHeadphones size={18} />
            Email Support
          </a>
          <a
            href={GITHUB_ISSUES}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a2233] hover:bg-blue-800 text-blue-300 font-medium border border-blue-700 transition-colors duration-150"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            🐞 Report a Bug
          </a>
        </div>
      )}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 border-2 border-blue-400"
        aria-label="Support"
        onClick={() => setOpen((v) => !v)}
        style={{ boxShadow: "0 4px 24px 0 #0a1a2f55" }}
      >
        <FiHeadphones size={28} />
      </button>
    </div>
  );
};

export default SupportFab;
