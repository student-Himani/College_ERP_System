import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AdminNavbar />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
