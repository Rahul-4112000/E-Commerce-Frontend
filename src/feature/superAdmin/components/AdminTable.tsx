'use client'

import React, { useEffect, useState } from "react";
import { SearchInput } from "@/shared/components/molecules/SearchInput";
import { Table, Column } from "@/shared/components/organisms/Table";
import { getApi } from "@/shared/utils/api-connector";
import { API_PATHS } from "@/config/api.path";
import { useApi } from "@/shared/hooks/use.api";
import { AdminService } from "../services/admin.service";

export type TAdmin = {
  _id: number;
  name?: string;
  email: string;
  isActive: boolean;
};

export type AdminData = {
  count: number,
  admin: TAdmin[]
}

const initialAdminState: AdminData = {
  count: 0,
  admin: [],

}

export const AdminTable = () => {

  const { data: adminList, isLoading, setData: setAdminData } = useApi(AdminService.getAll, {
    immediate: true,
    initialData: initialAdminState
  });

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {

    try {
      setAdminData((prevState) => ({
        ...prevState,
        admin: prevState.admin.map((adminUser) => adminUser._id === id ? { ...adminUser, isActive: !currentStatus } : adminUser)
      }));
      await AdminService.toggleStatus(id, !currentStatus);

    } catch (error) {

      setAdminData((prevState) => ({
        ...prevState,
        admin: prevState.admin.map((adminUser) => adminUser._id === id ? { ...adminUser, isActive: currentStatus } : adminUser)
      }));

    }
  };


  const columns: Column<TAdmin>[] = [
    {
      header: "Name",
      key: "name",
      render: (admin) => (
        <span className="font-semibold text-gray-900">
          {admin.name && admin.name.trim() !== "" ? admin.name : "-"}
        </span>
      ),
    },
    {
      header: "Email",
      key: "email",
      render: (admin) => <span className="text-gray-500">{admin.email}</span>,
    },
    {
      header: "Status",
      key: "status",
      render: (admin) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${admin.isActive
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-gray-50 text-gray-500 border-gray-200"
            }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${admin.isActive ? "bg-green-500" : "bg-gray-400"
              }`}
          ></span>
          {admin.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Action",
      key: "toggleSwitch",
      render: (admin) => (
        <button
          type="button"
          onClick={() => handleToggleStatus(admin._id, admin.isActive)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${admin.isActive ? "bg-indigo-600" : "bg-gray-200"
            }`}
          role="switch"
          aria-checked={admin.isActive}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${admin.isActive ? "translate-x-5" : "translate-x-0"
              }`}
          />
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-200">
        <SearchInput placeholder="Search admins..." />
        <div className="text-sm text-gray-500 font-medium bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
          Total: <span className="text-indigo-600 font-semibold">{adminList.count}</span> Admins
        </div>
      </div>

      <Table
        columns={columns}
        data={adminList.admin}
        keyExtractor={(item) => item._id}
        isLoading={isLoading}
        loadingMessage={
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            Please wait, getting admins info...
          </div>
        }
      />
    </div>
  );
};
