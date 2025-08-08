import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { deleteUserAccount } from "../utils/apicalls";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
  const { username, token } = useAuthStore.getState();

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");
    setShowDialog(false);
    const response = await deleteUserAccount(username || "", token || "");
    if (response.detail === "User deleted successfully") {
      setSuccess(true);
      toast.success("Account deleted successfully");
      setTimeout(() => {
        logout();
        navigate("/");
      }, 2000);
    } else {
      const msg = response.detail || "Unknown error";
      setError(msg);
      toast.error(msg);
    }
    setIsDeleting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-96px)] p-6">
      <div className="w-full max-w-xl bg-[#0f2236]/80 border border-blue-400 rounded-md p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-red-400">We're sorry to see you go</h1>
        <p className="mb-6 text-gray-200">
          Deleting your account is <span className="font-bold text-red-400">permanent</span> and cannot be undone.
          Your account and all associated data will be removed from our servers.
        </p>
        <div className="mb-8 text-sm text-gray-300">
          Need help or want to request a review? Email us at
          {" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 underline">
            {SUPPORT_EMAIL}
          </a>
          {" "}
          or
          {" "}
          <a
            href={GITHUB_ISSUES}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            report an issue on GitHub
          </a>
          .
        </div>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        {success ? (
          <div className="text-green-400 font-semibold">Account deleted successfully. Goodbye!</div>
        ) : (
          <div className="flex gap-3">
            <button
              className="text-sm rounded-md text-white px-5 py-3 bg-red-600 font-bold hover:bg-red-700 disabled:opacity-50"
              onClick={() => setShowDialog(true)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete My Account"}
            </button>
            <button
              className="text-sm rounded-md text-white px-5 py-3 bg-gray-600 font-bold hover:bg-gray-700"
              onClick={() => navigate("/dashboard")}
            >
              Go Back
            </button>
          </div>
        )}
      </div>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-[#0f2236] border border-red-500 p-8 flex flex-col gap-6 rounded-md shadow-xl max-w-lg w-[90%]">
            <h2 className="text-xl font-bold text-red-400">Are you absolutely sure?</h2>
            <p className="text-gray-200">
              This action <span className="font-bold text-red-400">cannot be undone</span>.
              Your account and all data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                className="flex-1 rounded-md bg-red-600 text-white font-bold px-4 py-2 hover:bg-red-700"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                Yes, Delete My Account
              </button>
              <button
                className="flex-1 rounded-md bg-gray-600 text-white px-4 py-2 hover:bg-gray-700"
                onClick={() => setShowDialog(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
