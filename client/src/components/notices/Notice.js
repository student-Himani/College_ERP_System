import React from "react";
import { useDispatch } from "react-redux";
import { deleteNotice } from "../../redux/actions/adminActions";
import { motion } from "framer-motion";
import { Trash2, Bell, Users, GraduationCap, Shield } from "lucide-react";

const Notice = ({ idx, notice, notFor }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  // Determining if current user is admin
  const isAdmin = user?.role === "admin" || user?.result?.username?.startsWith("ADM") || window.location.pathname.includes("/admin");

  if (notFor === notice.noticeFor) return null;

  const target =
    notice.noticeFor === "student"
      ? "Students"
      : notice.noticeFor === "faculty"
        ? "Faculty"
        : "All";

  const getTargetColor = () => {
    switch (notice.noticeFor) {
      case "student":
        return {
          bg: "bg-[#EEF2FF] dark:bg-[#6366F1]/20",
          text: "text-[#6366F1] dark:text-[#A5B4FC]",
          border: "border-[#6366F1]/20",
          icon: GraduationCap
        };
      case "faculty":
        return {
          bg: "bg-[#FEF3C7] dark:bg-[#F59E0B]/20",
          text: "text-[#F59E0B]",
          border: "border-[#F59E0B]/20",
          icon: Users
        };
      default:
        return {
          bg: "bg-[#D1FAE5] dark:bg-[#10B981]/20",
          text: "text-[#10B981]",
          border: "border-[#10B981]/20",
          icon: Shield
        };
    }
  };

  const targetStyle = getTargetColor();
  const TargetIcon = targetStyle.icon;

  const handleDelete = (e) => {
    e.stopPropagation(); // prevent triggering parent clicks
    if (window.confirm("Are you sure you want to delete this notice?")) {
      dispatch(deleteNotice(notice._id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] shadow-lg shadow-[#6366F1]/5 hover:shadow-xl hover:shadow-[#6366F1]/10 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 overflow-hidden flex-1">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#EEF2FF] dark:bg-[#6366F1]/20 flex items-center justify-center"
        >
          <Bell className="w-5 h-5 text-[#6366F1] dark:text-[#A5B4FC]" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-[#1E293B] dark:text-white truncate mb-1">
            {notice.topic}
          </h3>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] truncate">
            {notice.content}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${targetStyle.bg} ${targetStyle.text} ${targetStyle.border} border`}
        >
          <TargetIcon size={12} />
          {target}
        </motion.span>
        {isAdmin && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="flex-shrink-0 p-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
            title="Delete Notice"
          >
            <Trash2 size={16} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Notice;
