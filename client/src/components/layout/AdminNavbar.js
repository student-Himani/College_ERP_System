import React, { useState, useRef, useEffect } from "react";
import { Bell, Search, LogOut, User as UserIcon, Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../common/NotificationBell";

const AdminNavbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : {};
  const admin = user?.admin || user?.result;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <header className="h-16 shrink-0 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#5B4B8A]/20 focus:border-[#5B4B8A]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell />

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#5B4B8A] flex items-center justify-center">
              <UserIcon size={16} className="text-white" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-[#1F2937]">
                {admin?.name || "Administrator"}
              </p>
              <p className="text-xs text-[#6B7280]">Admin</p>
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-50">
              <button
                type="button"
                onClick={() => {
                  setShowProfile(false);
                  navigate("/admin/profile");
                }}
                className="w-full px-4 py-2 text-left text-sm text-[#1F2937] hover:bg-[#F8FAFC] flex items-center gap-2"
              >
                <UserIcon size={15} />
                Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowProfile(false);
                  navigate("/admin/update");
                }}
                className="w-full px-4 py-2 text-left text-sm text-[#1F2937] hover:bg-[#F8FAFC] flex items-center gap-2"
              >
                <Settings size={15} />
                Settings
              </button>
              <hr className="my-1 border-[#E5E7EB]" />
              <button
                type="button"
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
