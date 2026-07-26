import React from "react";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import NotificationBell from "../common/NotificationBell";

const Header = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : {};
  const faculty = user?.faculty;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <header className="z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      {/* Left - Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#00A8A8] shadow-md">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
            College ERP
          </span>
          <span className="text-sm font-bold text-[#0B1F3A]">
            Faculty Dashboard
          </span>
        </div>
      </div>

      {/* Right - User Info & Actions */}
      <div className="flex items-center gap-5">
        <div className="hidden text-right sm:block">
          <p className="text-xs text-gray-500">Welcome back,</p>
          <p className="text-sm font-semibold text-[#0B1F3A]">
            {faculty?.name || "Faculty"}
          </p>
          <p className="text-[11px] text-gray-400">
            {faculty?.department || "Department"} • {faculty?.designation || "Designation"}
          </p>
        </div>

        <NotificationBell />

        <Avatar
          src={faculty?.avatar}
          alt={faculty?.name?.charAt(0)}
          sx={{ width: 40, height: 40 }}
          className="border-2 border-[#E8F4F8] shadow-sm"
        />

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-[#0B1F3A] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <LogoutIcon fontSize="small" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
