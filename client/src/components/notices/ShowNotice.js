import React from "react";
import { motion } from "framer-motion";
import { Bell, Calendar, User, Sparkles } from "lucide-react";

const ShowNotice = ({ notice }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col space-y-6"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] dark:border-[#334155]">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6366F1] to-[#818CF8] flex items-center justify-center shadow-lg shadow-[#6366F1]/25"
          >
            <Bell className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User size={14} className="text-[#6366F1]" />
              <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider">From</span>
            </div>
            <p className="text-sm font-bold text-[#1E293B] dark:text-white">{notice.from}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EEF2FF] dark:bg-[#6366F1]/20 border border-[#E2E8F0] dark:border-[#334155]">
          <Calendar size={16} className="text-[#6366F1]" />
          <span className="text-xs font-bold text-[#6366F1] dark:text-[#A5B4FC]">{notice.date}</span>
        </div>
      </div>

      {/* Topic Section */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF2FF] dark:bg-[#6366F1]/20 border border-[#E2E8F0] dark:border-[#334155] mb-4"
        >
          <Sparkles size={14} className="text-[#F59E0B]" />
          <span className="text-[10px] font-bold text-[#6366F1] dark:text-[#A5B4FC] uppercase tracking-widest">Announcement</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-black text-[#1E293B] dark:text-white tracking-tight"
        >
          {notice.topic}
        </motion.h1>
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <div className="p-6 rounded-2xl bg-[#F7F8FC] dark:bg-[#1E293B]/50 border border-[#E2E8F0] dark:border-[#334155]">
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed whitespace-pre-wrap max-h-[20rem] overflow-y-auto scrollbar-thin scrollbar-thumb-[#6366F1]/20 scrollbar-track-transparent">
            {notice.content}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShowNotice;
