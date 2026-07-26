import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Users,
  BookOpen,
  PlusCircle,
  Trash2,
  Bell,
  Building2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  ClipboardCheck,
} from "lucide-react";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Sidebar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    alert("Session expired. Please login again");
    dispatch({ type: "LOGOUT" });
    navigate("/login/adminLogin");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < Date.now()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("admin")));
  }, [navigate]);

  const menuItems = [
    {
      section: "Main",
      items: [
        { path: "/admin/home", icon: Home, label: "Dashboard" },
        { path: "/admin/profile", icon: User, label: "Profile" },
      ],
    },
    {
      section: "Notice",
      items: [
        { path: "/admin/createNotice", icon: Bell, label: "Create Notice" },
      ],
    },
    {
      section: "Admin",
      items: [
        { path: "/admin/addadmin", icon: PlusCircle, label: "Add Admin" },
        { path: "/admin/deleteadmin", icon: Trash2, label: "Delete Admin" },
      ],
    },
    {
      section: "Hostel",
      items: [
        { path: "/admin/hostelleave", icon: ClipboardCheck, label: "Leave Approvals" },
        { path: "/admin/hostelattendance", icon: ClipboardCheck, label: "Hostel Attendance" },
        { path: "/admin/allwarden", icon: Users, label: "All Wardens" },
        { path: "/admin/addwarden", icon: PlusCircle, label: "Add Warden" },
        { path: "/admin/deletewarden", icon: Trash2, label: "Delete Warden" },
      ],
    },
    {
      section: "Department",
      items: [
        { path: "/admin/adddepartment", icon: Building2, label: "Add Department" },
        { path: "/admin/deletedepartment", icon: Trash2, label: "Delete Department" },
      ],
    },
    {
      section: "Faculty",
      items: [
        { path: "/admin/allfaculty", icon: Users, label: "Our Faculty" },
        { path: "/admin/addfaculty", icon: PlusCircle, label: "Add Faculty" },
        { path: "/admin/deletefaculty", icon: Trash2, label: "Delete Faculty" },
      ],
    },
    {
      section: "Students",
      items: [
        { path: "/admin/allstudent", icon: Users, label: "Our Students" },
        { path: "/admin/addstudent", icon: PlusCircle, label: "Add Students" },
        { path: "/admin/deletestudent", icon: Trash2, label: "Delete Student" },
      ],
    },
    {
      section: "Subjects",
      items: [
        { path: "/admin/allsubject", icon: BookOpen, label: "Subjects" },
        { path: "/admin/addsubject", icon: PlusCircle, label: "Add Subject" },
        { path: "/admin/deletesubject", icon: Trash2, label: "Delete Subject" },
      ],
    },
  ];

  return (
    <div
      className={`h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out relative ${isCollapsed ? "w-[70px]" : "w-[260px]"
        }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#00A8A8] flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#0B1F3A]">College ERP</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#00A8A8] flex items-center justify-center shadow-lg mx-auto">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute z-50 flex items-center justify-center w-6 h-6 transition-all duration-200 bg-white border border-gray-200 rounded-full shadow-md -right-3 top-20 hover:shadow-lg hover:scale-110"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Menu */}
      <div className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {menuItems.map((section) => (
          <div key={section.section} className="mb-6">
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                {section.section}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                        ? "bg-[#E8F4F8] text-[#0B1F3A] font-medium border-l-4 border-[#00A8A8]"
                        : "text-gray-500 hover:bg-gray-50 hover:text-[#0B1F3A]"
                      } ${isCollapsed ? "justify-center" : ""}`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-all duration-200 ${isActive ? "text-[#00A8A8]" : "text-gray-400 group-hover:text-[#00A8A8]"
                        }`}
                    />
                    {!isCollapsed && (
                      <span className="text-sm whitespace-nowrap">{item.label}</span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1a365d] rounded-xl p-4 text-white">
            <p className="mb-1 text-xs opacity-80">Need Help?</p>
            <p className="text-sm font-medium">Contact Support</p>
            <p className="mt-1 text-xs opacity-60">support@college.edu</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;