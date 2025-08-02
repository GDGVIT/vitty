import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { deleteUserAccount } from "../utils/apicalls";
import { useNavigate } from "react-router-dom";

const SUPPORT_EMAIL = "dscvit.vitty@gmail.com";
const GITHUB_ISSUES =
  "https://github.com/GDGVIT/vitty/issues/new?template=bug_report.md";

export default function AccountDelete() {
  const { logout } =
    useAuthStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");
    setShowDialog(false);
    const response = await deleteUserAccount(userName || "", token || "");
    if (response.detail === "User deleted successfully") {
      setSuccess(true);
      setTimeout(() => {
        logout();
        navigate("/");
        localStorage.clear();
      }, 2000);
    } else {
      setError(response.detail || "Unknown error");
    }
    setIsDeleting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4 text-red-500">
        We're sorry to see you go
      </h1>
      <p className="mb-4 text-gray-300 text-center max-w-lg">
        Deleting your account is{" "}
        <span className="font-bold text-red-400">permanent</span> and cannot be
        undone.
        <br />
        All your data will be removed from our servers. If you are sure, click
        the button below.
      </p>
      <div className="mb-6 text-sm text-gray-400 text-center">
        Need help or want to request a review? Email us at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 underline">
          {SUPPORT_EMAIL}
        </a>
        <br />
        Or{" "}
        <a
          href={GITHUB_ISSUES}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline"
        >
          report a bug/issue on GitHub
        </a>
        .
      </div>
      {error && <div className="text-red-400 mb-4">{error}</div>}
      {success ? (
        <div className="text-green-400 font-semibold">
          Account deleted successfully. Goodbye!
        </div>
      ) : (
        <React.Fragment>
          <button
            className="bg-red-600 text-white px-6 py-3 rounded font-bold hover:bg-red-700 disabled:opacity-50"
            onClick={() => setShowDialog(true)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete My Account"}
          </button>
          {showDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
              <div className="bg-[#1a2233] p-8 flex flex-col gap-6 rounded shadow-lg max-w-lg w-full border border-red-500">
                <h2 className="text-xl font-bold text-red-400 mb-2">
                  Are you absolutely sure?
                </h2>
                <p className="mb-4 text-gray-200">
                  This action{" "}
                  <span className="font-bold text-red-400">
                    cannot be undone
                  </span>
                  .<br />
                  Your account and all data will be{" "}
                  <span className="font-bold">permanently deleted</span>.<br />
                  If you want a review or have concerns, please contact support
                  first.
                </p>
                <div className="flex gap-4 justify-end">
                  <button
                    className="px-4 py-2 rounded w-full bg-red-600 text-white font-bold hover:bg-red-700"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    Yes, Delete My Account
                  </button>
                  <button
                    className="px-4 py-2 w-full rounded bg-gray-600 text-white hover:bg-gray-700"
                    onClick={() => setShowDialog(false)}
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
