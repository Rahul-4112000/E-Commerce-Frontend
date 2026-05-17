import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import { Link } from "lucide-react";

const InvalidInvite = () => {
  return (
    <AuthTemplate>
      <div className="w-full flex flex-col items-center justify-center text-center space-y-6 py-12">
        <div className="bg-red-50 p-4 rounded-full">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-neutral-900">Link Expired</h2>
          <p className="text-neutral-500 font-medium max-w-sm mx-auto">
            This invitation link is invalid or has expired. Please request a new
            invite link from your administrator.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center w-full h-12 text-base font-bold bg-neutral-900 hover:bg-neutral-800 text-white transition-colors mt-8"
        >
          GO TO HOME PAGE
        </Link>
      </div>
    </AuthTemplate>
  );
};

export default InvalidInvite;
