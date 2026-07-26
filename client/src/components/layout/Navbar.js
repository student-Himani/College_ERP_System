import React, { useState, useRef, useEffect } from "react";
import { Avatar } from "@mui/material";
import { LogOut, User, Settings, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../common/NotificationBell";

const Navbar = ({ userType = "Student" }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : {};
  const userData = user[userType.toLowerCase()] || user.result || {};

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Search Bar - Global Search inspired */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search resources, students, or marks..."
            className="w-full bg-surface border border-transparent focus:border-accent/20 focus:bg-white focus:ring-4 focus:ring-accent/5 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium transition-all outline-none"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        <NotificationBell />

        <div className="h-8 w-px bg-gray-100 mx-2" />

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 hover:bg-surface rounded-2xl transition-all group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-bold text-primary/30 uppercase tracking-widest leading-none mb-1">
                {userType} Portal
              </p>
              <p className="text-sm font-bold text-primary leading-none">
                {userData.name || "User Account"}
              </p>
            </div>
            <Avatar
              src={userData.avatar}
              alt={userData.name?.charAt(0)}
              sx={{ width: 42, height: 42 }}
              className="border-2 border-white shadow-sm group-hover:shadow-md transition-all"
            />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className={`
              absolute right-0 mt-4 w-64 bg-white border border-gray-100 rounded-2xl shadow-premium p-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200
            `}>
              <div className="px-4 py-3 border-b border-gray-50 mb-2">
                <p className="text-sm font-bold text-primary">{userData.name}</p>
                <p className="text-xs text-primary/40 truncate">{userData.email || "No email provided"}</p>
              </div>
              
              <button 
                onClick={() => navigate(`/${userType.toLowerCase()}/profile`)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-primary/70 hover:bg-surface hover:text-primary rounded-xl transition-all"
              >
                <User size={18} />
                Profile Settings
              </button>
              
              <button 
                onClick={() => navigate(`/${userType.toLowerCase()}/settings`)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-primary/70 hover:bg-surface hover:text-primary rounded-xl transition-all"
              >
                <Settings size={18} />
                Portal Settings
              </button>

              <div className="h-px bg-gray-50 my-2" />
              
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
