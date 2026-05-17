import React from "react";
import { AdminNavbar } from "../../src/shared/components/organisms/AdminNavbar";
import { AdminInvite } from "../../src/feature/superAdmin/components/AdminInvite";
import { AdminTable } from "../../src/feature/superAdmin/components/AdminTable";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Shared Navbar */}
      <AdminNavbar title="Super Admin" />

      {/* Main Content using feature components */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AdminInvite />
        <AdminTable />
      </main>
    </div>
  );
}
