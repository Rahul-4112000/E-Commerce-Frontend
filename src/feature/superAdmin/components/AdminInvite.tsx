"use client";

import React, { useState } from "react";
import { Loader, Mail, Plus, Send } from "lucide-react";
import { emailValidation } from "@/shared/validation/validation";
import { showToast } from "@/shared/utils/toast.util";
import { postApi } from "@/shared/utils/api-connector";
import { API_PATHS } from "@/config/api.path";
import { Button } from "@/shared/components/atoms/Button";

const initialState = {
  email: "",
  loading: false,
};

export const AdminInvite = () => {
  const [adminData, setAdminData] = useState(initialState);

  const handleSubmit = async () => {
    const validationResult = emailValidation.safeParse(adminData.email);

    if (!validationResult.success) {
      showToast.error(validationResult.error.issues[0].message);
      return;
    }

    try {
      setAdminData((prevState) => ({
        ...prevState,
        loading: true,
      }));

      await postApi(API_PATHS.invite, { email: adminData.email });

      showToast.success("Admin invitation sent successfully!");
      setAdminData(initialState);
    } catch (error) {
      if (error instanceof Error) {
        showToast.error(error.message);
        return;
      }

      showToast.error("Something went wrong.");
    } finally {
      setAdminData((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
        <p className="text-gray-500 mt-1">
          Manage system administrators and their permissions
        </p>
      </div>

      <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex items-center gap-2 md:w-96">
        <div className="relative flex-1">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            value={adminData.email}
            required
            onChange={(e) =>
              setAdminData({ ...adminData, email: e.target.value })
            }
            type="email"
            placeholder="Enter email to invite..."
            className="w-full pl-10 pr-4 py-2 bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-400"
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={adminData.loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm cursor-pointer"
        >
          {adminData.loading ? <Loader size={16} /> : <span className="flex gap-2"><Send size={16} className="mt-0.5" /> Invite</span>}

        </Button>
      </div>
    </div>
  );
};
