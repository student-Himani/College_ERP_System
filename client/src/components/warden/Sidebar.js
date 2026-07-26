import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { LOGOUT } from "../../redux/actionTypes";

const Sidebar = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        alert("Session expired. Please login again");
        logout();
      }
    }
  }, [navigate]);

  const menuItems = [
    {
      section: "Main",
      items: [
        { path: "/warden-dashboard", icon: Home, label: "Dashboard" },
      ],
    },
    {
      section: "Hostel",
      items: [
        { path: "/warden/hostelleave", icon: ClipboardCheck, label: "Leave Approvals" },
        { path: "/warden/hostelattendance", icon: ClipboardCheck, label: "Hostel Attendance" },
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
              <p className="text-xs text-gray-400">Warden Portal</p>
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
                const isActive = location.pathname === item.path || (location.pathname === "/warden/home" && item.path === "/warden-dashboard");
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
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={logout}
          className={`flex items-center w-full transition-all duration-300 text-gray-500 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg 
           ${isCollapsed ? "justify-center" : "gap-3"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>

    </div>
  );
};

export default Sidebar;
