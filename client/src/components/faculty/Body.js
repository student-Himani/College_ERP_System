import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStudent, getAllSubject } from "../../redux/actions/adminActions";
import { getTest } from "../../redux/actions/facultyActions";
import {
  Users,
  BookOpen,
  FileText,
  TrendingUp,
  PlusCircle,
  ClipboardCheck,
  ArrowRight,
  Reply as ReplyIcon,
  Bell,
  Sparkles
} from "lucide-react";
import Notice from "../notices/Notice";
import ShowNotice from "../notices/ShowNotice";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import FacultyDashboardVector from "./FacultyDashboardVector";

const Body = () => {
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const dispatch = useDispatch();

  const notices = useSelector((state) => state.admin.notices?.result || []);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : {};
  const faculty = user?.faculty || user?.result || {};
  const facultyId = faculty?._id;

  useEffect(() => {
    dispatch(getAllSubject());
    dispatch(getAllStudent());
    dispatch(getTest());
  }, [dispatch]);

  const allStuds = useSelector((state) => state.admin.allStudent);
  const specStuds = useSelector((state) => state.admin.students?.result);
  const students = (specStuds && specStuds.length > 0) ? specStuds : ((allStuds && allStuds.length > 0) ? allStuds : []);

  const allSubs = useSelector((state) => state.admin.allSubject);
  const specSubs = useSelector((state) => state.admin.subjects?.result);
  const subjects = (specSubs && specSubs.length > 0) ? specSubs : ((allSubs && allSubs.length > 0) ? allSubs : []);

  const facTests = useSelector((state) => state.faculty.tests?.result);
  const rawTests = useSelector((state) => state.faculty.tests);
  const tests = (facTests && facTests.length > 0) ? facTests : ((rawTests && rawTests.length > 0) ? rawTests : []);

  const facultySubjects = subjects.filter(
    (sub) =>
      String(sub.facultyId) === String(facultyId) ||
      String(sub.faculty) === String(facultyId) ||
      sub.department === faculty?.department
  );

  const facultyStudents = students.filter((stu) =>
    stu.department === faculty?.department
  );

  const facultyTests = tests.filter(
    (test) =>
      String(test.facultyId) === String(facultyId) ||
      String(test.faculty) === String(facultyId) ||
      test.department === faculty?.department
  );

  const statsCards = [
    {
      title: "Active Students",
      value: facultyStudents.length,
      label: "In your department",
      icon: Users,
      color: "text-[#5B4B8A]",
      bgColor: "bg-[#F3F0FA]",
      borderColor: "border-[#E5E7EB]",
    },
    {
      title: "Your Subjects",
      value: facultySubjects.length,
      label: "Assigned courses",
      icon: BookOpen,
      color: "text-[#5B4B8A]",
      bgColor: "bg-[#F3F0FA]",
      borderColor: "border-[#E5E7EB]",
    },
    {
      title: "Assessments",
      value: facultyTests.length,
      label: "Created tests",
      icon: FileText,
      color: "text-[#5B4B8A]",
      bgColor: "bg-[#F3F0FA]",
      borderColor: "border-[#E5E7EB]",
    },
    {
      title: "Status",
      value: "Active",
      label: faculty?.department || "Department",
      icon: TrendingUp,
      color: "text-[#5B4B8A]",
      bgColor: "bg-[#F3F0FA]",
      borderColor: "border-[#E5E7EB]",
    },
  ];

  const quickActions = [
    {
      label: "Mark Attendance",
      icon: ClipboardCheck,
      path: "/faculty/markattendance",
      variant: "primary",
    },
    {
      label: "Upload Marks",
      icon: FileText,
      path: "/faculty/uploadmarks",
      variant: "outline",
    },
    {
      label: "Create Test",
      icon: PlusCircle,
      path: "/faculty/createtest",
      variant: "outline",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-between gap-4 md:flex-row md:items-end"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1 rounded-full bg-[#F3F0FA] text-[#5B4B8A] text-[10px] font-semibold uppercase tracking-wider mb-2"
          >
            <Sparkles className="w-3 h-3 inline mr-1" />
            Faculty Intelligence
          </motion.div>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            Hi, Prof. {faculty?.name?.split(" ")[0] || "Faculty"}
          </h1>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs font-medium text-[#6B7280]"
        >
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-[#5B4B8A] animate-pulse" />
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-[#5B4B8A] rounded-full opacity-20"
            />
          </div>
          {faculty?.designation || "Senior Faculty"}
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
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

      {/* Quick Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap items-center gap-4 p-4 border border-[#E5E7EB] bg-white rounded-xl shadow-sm"
      >
        <div className="px-4 py-2">
          <p className="text-[10px] font-semibold text-[#5B4B8A] uppercase tracking-[0.2em]">Quick Operations</p>
        </div>
        {quickActions.map((action, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(action.path)}
            className={`px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${action.variant === "primary"
                ? "bg-[#5B4B8A] text-white hover:bg-[#4A3A7A] shadow-sm hover:shadow-md"
                : "bg-[#F3F0FA] text-[#5B4B8A] border border-[#E5E7EB] hover:bg-[#5B4B8A] hover:text-white"
              }`}
          >
            <action.icon size={18} />
            {action.label}
          </motion.button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-6 lg:col-span-1"
        >
          {/* Vector Illustration Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-[#F3F0FA] to-[#F8FAFC] rounded-xl p-6 border border-[#E5E7EB] shadow-sm"
          >
            <FacultyDashboardVector />
          </motion.div>

          <Card title="Session Calendar" subtitle="Manage your lecture schedule">
            <div className="p-2 mb-6 overflow-hidden border bg-[#F8FAFC] rounded-lg border-[#E5E7EB]">
              <style>{`
                  .react-calendar { border: none !important; width: 100% !important; font-family: inherit; }
                  .react-calendar__navigation button { font-weight: 600; color: #5B4B8A !important; font-size: 12px; }
                  .react-calendar__tile--now { background: #F3F0FA !important; color: #5B4B8A !important; font-weight: 600; border-radius: 6px; }
                  .react-calendar__tile--active { background: #5B4B8A !important; color: white !important; border-radius: 6px; }
                  .react-calendar__month-view__weekdays { font-weight: 600; color: #8B7BB5; font-size: 10px; text-transform: uppercase; }
                `}</style>
              <Calendar onChange={onChange} value={value} />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-12 px-6 py-3 rounded-xl text-sm font-semibold text-[#5B4B8A] bg-[#F3F0FA] border border-[#E5E7EB] hover:bg-[#5B4B8A] hover:text-white transition-all flex items-center justify-between group"
            >
              Schedule New Unit <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Card>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-[#5B4B8A] to-[#8B7BB5] rounded-xl p-6 border-none shadow-sm text-white"
          >
            <h4 className="mb-2 text-lg font-semibold">Faculty Assistance</h4>
            <p className="mb-6 text-sm font-medium opacity-80">Need help with mark uploads or portal issues? Reach our team.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all bg-white/20 hover:bg-white/30 rounded-lg"
            >
              Live Support
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column - Notices */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-6 lg:col-span-2"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm flex flex-col min-h-[500px]"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
              <div>
                <h3 className="text-base font-semibold text-[#1F2937]">
                  {open ? "Communication Details" : "Department Feeds"}
                </h3>
                <p className="text-sm text-[#6B7280]">
                  {open ? "Official institutional message" : "Latest updates for staff and faculty"}
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
                        <Notice idx={idx} notice={notice} notFor="faculty" />
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
                    <p className="text-sm font-medium text-[#6B7280]">No active communications found</p>
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
