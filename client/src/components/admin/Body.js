import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notice from "../notices/Notice";
import ShowNotice from "../notices/ShowNotice";
import {
  Users,
  GraduationCap,
  Shield,
  Building2,
  Bell,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const Body = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const [value, onChange] = useState(new Date());

  const notices = useSelector((state) => state.admin.notices?.result || []);
  const students = useSelector((state) => state.admin.allStudent || []);
  const faculties = useSelector((state) => state.admin.allFaculty || []);
  const admins = useSelector((state) => state.admin.allAdmin || []);
  const departments = useSelector((state) => state.admin.allDepartment || []);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : {};
  const adminName = user?.admin?.name || user?.result?.name || "Administrator";

  const statsCards = [
    { title: "Faculty", value: faculties.length, label: "Active professors", icon: GraduationCap },
    { title: "Students", value: students.length, label: "Enrolled students", icon: Users },
    { title: "Admins", value: admins.length, label: "System operators", icon: Shield },
    { title: "Departments", value: departments.length, label: "Academic departments", icon: Building2 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#F3F0FA] text-[#5B4B8A] text-[10px] font-semibold uppercase tracking-wider mb-2">
            Dashboard
          </span>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            Welcome back, {adminName?.split(" ")[0]}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">Overview of your institution at a glance.</p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E5E7EB] text-xs font-medium text-[#6B7280]">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          System operational
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#F3F0FA] flex items-center justify-center">
                  <Icon size={20} className="text-[#5B4B8A]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1F2937]">{card.value}</p>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#1F2937] mb-1">Calendar</h3>
            <p className="text-sm text-[#6B7280] mb-4">Campus scheduling</p>
            <div className="rounded-lg border border-[#E5E7EB] overflow-hidden">
              <style>{`
                .react-calendar { border: none !important; width: 100% !important; font-family: inherit; }
                .react-calendar__navigation button { font-weight: 600; color: #5B4B8A !important; font-size: 12px; }
                .react-calendar__tile--now { background: #F3F0FA !important; color: #5B4B8A !important; font-weight: 600; border-radius: 6px; }
                .react-calendar__tile--active { background: #5B4B8A !important; color: white !important; border-radius: 6px; }
                .react-calendar__month-view__weekdays { font-weight: 600; color: #8B7BB5; font-size: 10px; text-transform: uppercase; }
              `}</style>
              <Calendar onChange={onChange} value={value} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/createNotice")}
            className="w-full flex items-center justify-between p-5 bg-white rounded-xl border border-dashed border-[#E5E7EB] hover:border-[#5B4B8A]/40 hover:bg-[#F3F0FA]/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F3F0FA] flex items-center justify-center group-hover:bg-[#5B4B8A] transition-colors">
                <Bell size={18} className="text-[#5B4B8A] group-hover:text-white transition-colors" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-[#1F2937]">Create Notice</p>
                <p className="text-xs text-[#6B7280]">Broadcast to campus</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-[#9CA3AF] group-hover:text-[#5B4B8A]" />
          </button>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm flex flex-col min-h-[480px]">
            <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
              <div>
                <h3 className="text-base font-semibold text-[#1F2937]">
                  {open ? "Notice Details" : "Recent Notices"}
                </h3>
                <p className="text-sm text-[#6B7280]">
                  {open ? "Full announcement preview" : "Latest campus communications"}
                </p>
              </div>
              {open && (
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#5B4B8A] bg-[#F3F0FA] hover:bg-[#E8E0F5] transition-colors"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!open ? (
                notices?.length > 0 ? (
                  <div className="space-y-3">
                    {notices.map((notice, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setOpen(true);
                          setOpenNotice(notice);
                        }}
                        className="w-full text-left p-4 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] hover:bg-white hover:border-[#5B4B8A]/30 transition-all"
                      >
                        <Notice idx={idx} notice={notice} notFor="" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Bell size={40} className="mb-3 text-[#5B4B8A]/20" />
                    <p className="text-sm font-medium text-[#6B7280]">No notices yet</p>
                  </div>
                )
              ) : (
                <div className="p-4 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC]">
                  <ShowNotice notice={openNotice} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
