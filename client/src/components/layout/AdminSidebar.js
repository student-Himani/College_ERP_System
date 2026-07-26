import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Bell,
  PlusCircle,
  Trash2,
  Users,
  Building2,
  ClipboardCheck,
  BookOpen,
  GraduationCap,
  Shield,
  HelpCircle,
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();

  const menuSections = [
    {
      title: "Main",
      items: [
        { path: "/admin/home", icon: LayoutDashboard, label: "Dashboard" },
        { path: "/admin/profile", icon: User, label: "Profile" },
      ],
    },
    {
      title: "Notice",
      items: [
        { path: "/admin/createNotice", icon: Bell, label: "Create Notice" },
      ],
    },
    {
      title: "Administration",
      items: [
        { path: "/admin/addadmin", icon: PlusCircle, label: "Add Admin" },
        { path: "/admin/deleteadmin", icon: Trash2, label: "Delete Admin" },
      ],
    },
    {
      title: "Hostel",
      items: [
        { path: "/admin/hostelleave", icon: ClipboardCheck, label: "Leave Approvals" },
        { path: "/admin/hostelattendance", icon: ClipboardCheck, label: "Hostel Attendance" },
        { path: "/admin/allwarden", icon: Users, label: "All Wardens" },
        { path: "/admin/addwarden", icon: PlusCircle, label: "Add Warden" },
        { path: "/admin/deletewarden", icon: Trash2, label: "Delete Warden" },
      ],
    },
    {
      title: "Department",
      items: [
        { path: "/admin/adddepartment", icon: Building2, label: "Add Department" },
        { path: "/admin/deletedepartment", icon: Trash2, label: "Delete Department" },
      ],
    },
    {
      title: "Faculty",
      items: [
        { path: "/admin/allfaculty", icon: Users, label: "Our Faculty" },
        { path: "/admin/addfaculty", icon: PlusCircle, label: "Add Faculty" },
        { path: "/admin/deletefaculty", icon: Trash2, label: "Delete Faculty" },
      ],
    },
    {
      title: "Students",
      items: [
        { path: "/admin/allstudent", icon: GraduationCap, label: "Our Students" },
        { path: "/admin/addstudent", icon: PlusCircle, label: "Add Students" },
        { path: "/admin/deletestudent", icon: Trash2, label: "Delete Student" },
      ],
    },
    {
      title: "Subjects",
      items: [
        { path: "/admin/allsubject", icon: BookOpen, label: "Subjects" },
        { path: "/admin/addsubject", icon: PlusCircle, label: "Add Subject" },
        { path: "/admin/deletesubject", icon: Trash2, label: "Delete Subject" },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[#E5E7EB] flex flex-col h-full">
      <div className="p-5 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#5B4B8A] flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-[#1F2937]">College ERP</h1>
            <p className="text-xs font-medium text-[#6B7280]">Admin Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-[#E5E7EB]">
        {menuSections.map((section) => (
          <div key={section.title} className="mb-5">
            <h3 className="px-3 mb-2 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#5B4B8A] text-white"
                        : "text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#1F2937]"
                    }`}
                  >
                    <Icon size={17} className="shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-[#E5E7EB]">
        <div className="bg-[#F8FAFC] rounded-lg p-4 border border-[#E5E7EB]">
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle size={15} className="text-[#5B4B8A]" />
            <span className="text-xs font-semibold text-[#1F2937]">Need Help?</span>
          </div>
          <p className="text-xs text-[#6B7280] mb-3">Contact support for assistance</p>
          <button
            type="button"
            className="w-full py-2 px-3 bg-[#5B4B8A] text-white text-xs font-semibold rounded-lg hover:bg-[#4A3A7A] transition-colors"
          >
            Get Support
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
