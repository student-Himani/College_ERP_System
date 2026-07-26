import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ShowNotice from "../notices/ShowNotice";
import { useSelector } from "react-redux";
import ReplyIcon from "@mui/icons-material/Reply";
import Notice from "../notices/Notice";
import {
  BookOpen,
  FileText,
  CalendarDays,
  Bell,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Card from "../ui/Card";
import { motion } from "framer-motion";
import StudentDashboardVector from "./StudentDashboardVector";

const Body = () => {
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const [value, onChange] = useState(new Date());

  const noticesState = useSelector((state) => state.admin.notices);
  const notices = noticesState?.result || noticesState || [];

  const testResultState = useSelector((state) => state.student.testResult);
  const testResult = testResultState?.result || testResultState || [];

  const attendanceState = useSelector((state) => state.student.attendance);
  const attendance = attendanceState?.result || attendanceState || [];

  const subjectsState = useSelector((state) => state.student.subjects);
  const subjects = subjectsState?.result || subjectsState || [];

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const student = user?.student || user?.result;

  const totalClassesAttended = Array.isArray(attendance)
    ? attendance.reduce((total, att) => total + (att?.attended || 0), 0)
    : 0;

  const totalClassesDelivered = Array.isArray(attendance)
    ? attendance.reduce((total, att) => total + (att?.total || 0), 0)
    : 0;

  let totalPercent = 0;
  if (Array.isArray(attendance) && attendance.length > 0) {
    attendance.forEach(att => {
      totalPercent += parseFloat(att.percentage || 0);
    });
  }
  const attendancePercent = attendance.length > 0 ? Math.round(totalPercent / attendance.length) : 0;

  const statsCards = [
    {
      title: "Enrollment",
      value: student?.year || "1st Year",
      label: "Current Year",
      icon: GraduationCap,
      color: "text-[#5B4B8A]",
      bgColor: "bg-[#F3F0FA]",
      borderColor: "border-[#E5E7EB]",
    },
    {
      title: "Academics",
      value: subjects?.length || 0,
      label: "Registered Subjects",
      icon: BookOpen,
      color: "text-[#5B4B8A]",
      bgColor: "bg-[#F3F0FA]",
      borderColor: "border-[#E5E7EB]",
    },
    {
      title: "Assessments",
      value: testResult?.length || 0,
      label: "Completed Tests",
      icon: FileText,
      color: "text-[#5B4B8A]",
      bgColor: "bg-[#F3F0FA]",
      borderColor: "border-[#E5E7EB]",
    },
    {
      title: "Presence",
      value: `${attendancePercent}%`,
      label: "Avg. Attendance",
      icon: TrendingUp,
      color: "text-[#5B4B8A]",
      bgColor: "bg-[#F3F0FA]",
      borderColor: "border-[#E5E7EB]",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F0FA] border border-[#E5E7EB] text-[#5B4B8A] font-bold text-[10px] uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3 h-3" />
            Overview Dashboard
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1F2937]">
            Welcome, {student?.name?.split(" ")[0] || "Student"}
          </h1>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 px-5 py-2.5 bg-white border border-[#E5E7EB] shadow-sm rounded-xl text-[#6B7280]">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-emerald-500 rounded-full opacity-20"
            />
          </div>
          <span className="text-xs font-semibold tracking-wide uppercase">System Selection Active</span>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {statsCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#F3F0FA] flex items-center justify-center">
                <card.icon size={20} className="text-[#5B4B8A]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1F2937]">{card.value}</p>
            <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mt-1">{card.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress & Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Vector Illustration Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-[#F3F0FA] to-[#F8FAFC] rounded-xl p-6 border border-[#E5E7EB] shadow-sm"
          >
            <StudentDashboardVector />
          </motion.div>

          <Card title="Attendance Health" subtitle="Overall tracking status">
            <div className="mt-4">
              <div className="flex items-end justify-between mb-2">
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-3xl font-bold text-[#1F2937]"
                >
                  {attendancePercent}%
                </motion.span>
                <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-1">Avg Score</span>
              </div>
              <div className="w-full h-3 bg-[#F8FAFC] rounded-full overflow-hidden border border-[#E5E7EB]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${attendancePercent}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-[#5B4B8A] rounded-full"
                />
              </div>
              <p className="text-xs font-medium text-[#6B7280] mt-4 leading-relaxed">
                Current record shows <span className="text-[#5B4B8A] font-semibold">{totalClassesAttended}</span> successful sessions out of <span className="text-[#5B4B8A] font-semibold">{totalClassesDelivered}</span> delivered units.
              </p>
            </div>
          </Card>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-5 border-2 border-dashed border-[#E5E7EB] shadow-sm"
          >
            <div className="flex items-center gap-4 py-2">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-xl bg-[#F3F0FA] flex items-center justify-center text-[#5B4B8A]"
              >
                <CalendarDays size={24} />
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-[#1F2937]">Academic Calendar</p>
                <p className="text-xs text-[#6B7280]">Upcoming events & exams</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="ml-auto p-2 hover:bg-[#F3F0FA] rounded-lg transition-all"
              >
                <ArrowRight size={18} className="text-[#9CA3AF]" />
              </motion.button>
            </div>
          </motion.div>

          <div className="bg-white rounded-xl p-2 border border-[#E5E7EB] shadow-sm overflow-hidden">
            <style>{`
              .react-calendar { border: none !important; width: 100% !important; font-family: inherit; }
              .react-calendar__navigation button { font-weight: 600; color: #5B4B8A !important; font-size: 12px; }
              .react-calendar__tile--now { background: #F3F0FA !important; color: #5B4B8A !important; font-weight: 600; border-radius: 6px; }
              .react-calendar__tile--active { background: #5B4B8A !important; color: white !important; border-radius: 6px; }
              .react-calendar__month-view__weekdays { font-weight: 600; color: #8B7BB5; font-size: 10px; text-transform: uppercase; }
            `}</style>
            <Calendar onChange={onChange} value={value} />
          </div>
        </motion.div>

        {/* Notices & Feeds */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-2 space-y-6"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm flex flex-col min-h-[480px]"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
              <div>
                <h3 className="text-base font-semibold text-[#1F2937]">
                  {open ? "Notice Details" : "Campus Announcements"}
                </h3>
                <p className="text-sm text-[#6B7280]">
                  {open ? "View complete communication" : "Latest updates from administration"}
                </p>
              </div>
              {open && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#5B4B8A] bg-[#F3F0FA] hover:bg-[#E8E0F5] transition-colors"
                >
                  <ReplyIcon className="w-4 h-4" />
                  Back to Feed
                </motion.button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!open ? (
                notices?.length > 0 ? (
                  <div className="space-y-3">
                    {notices.map((notice, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -2 }}
                        onClick={() => {
                          setOpen(true);
                          setOpenNotice(notice);
                        }}
                        className="w-full text-left p-4 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] hover:bg-white hover:border-[#5B4B8A]/30 transition-all cursor-pointer"
                      >
                        <Notice idx={idx} notice={notice} notFor="student" />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Bell size={40} className="mb-3 text-[#5B4B8A]/20" />
                    </motion.div>
                    <p className="text-sm font-medium text-[#6B7280]">No active notices found</p>
                  </motion.div>
                )
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC]"
                >
                  <ShowNotice notice={openNotice} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Body;