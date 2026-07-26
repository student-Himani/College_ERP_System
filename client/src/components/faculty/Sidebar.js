import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  User,
  PlusCircle,
  FileText,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
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
    alert("OOPS! Your session expired. Please Login again");
    dispatch({ type: "LOGOUT" });
    navigate("/login/facultylogin");
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("faculty")));
  }, [navigate]);

  const menuItems = [
    {
      section: "Main",
      items: [
        { path: "/faculty/home", icon: Home, label: "Dashboard" },
        { path: "/faculty/profile", icon: User, label: "Profile" },
      ],
    },
    {
      section: "Academics",
      items: [
        { path: "/faculty/createtest", icon: PlusCircle, label: "Create Test" },
        { path: "/faculty/uploadmarks", icon: FileText, label: "Upload Marks" },
        { path: "/faculty/markattendance", icon: ClipboardCheck, label: "Mark Attendance" },
        { path: "/faculty/hostelleave", icon: ClipboardCheck, label: "Leave Approvals" },
      ],
    },
  ];

  return (
    <div
      className={`h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out relative ${isCollapsed ? "w-[70px]" : "w-[260px]"
        }`}
    >
      {/* Logo Section */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#00A8A8] flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#0B1F3A]">College ERP</h1>
              <p className="text-xs text-gray-400">Faculty Portal</p>
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
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 z-50"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Menu */}
      <div className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                {section.section}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item, itemIdx) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <NavLink
                    key={itemIdx}
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
            <p className="text-xs opacity-80 mb-1">Need Help?</p>
            <p className="text-sm font-medium">Contact Support</p>
            <p className="text-xs opacity-60 mt-1">support@college.edu</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
