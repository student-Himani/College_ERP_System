import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  getWardenApprovedLeaves, 
  getWardenActiveLeaves, 
  getWardenAttendance 
} from "../../redux/actions/wardenActions";
import { 
  Home, 
  ClipboardCheck, 
  Calendar, 
  Users, 
  Clock,
  ArrowRight
} from "lucide-react";
import DashboardShell from "../layout/DashboardShell";
import Card from "../ui/Card";
import Table from "../ui/Table";
import Button from "../ui/Button";

const WardenHome = () => {
  const dispatch = useDispatch();
  
  const approvedLeaves = useSelector((state) => state.warden?.approvedLeaves) || [];
  const activeLeaves = useSelector((state) => state.warden?.activeLeaves) || [];
  const attendanceRecords = useSelector((state) => state.warden?.attendanceRecords) || [];

  useEffect(() => {
    dispatch(getWardenApprovedLeaves());
    dispatch(getWardenActiveLeaves());
    dispatch(getWardenAttendance());
  }, [dispatch]);

  const menuItems = [
    {
      section: "Main",
      items: [
        { path: "/warden-dashboard", icon: Home, label: "Dashboard" },
      ],
    },
    {
      section: "Hostel Management",
      items: [
        { path: "/warden/hostelleave", icon: ClipboardCheck, label: "Leave Approvals" },
        { path: "/warden/hostelattendance", icon: ClipboardCheck, label: "Hostel Attendance" },
      ],
    },
  ];

  const statsCards = [
    {
      title: "Active Leaves",
      value: activeLeaves.length,
      label: "Students out today",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "History",
      value: approvedLeaves.length,
      label: "Total approvals",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Residents",
      value: attendanceRecords.length,
      label: "Tracked students",
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <DashboardShell menuItems={menuItems} role="Hostel Warden">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-[10px] font-extrabold text-primary/30 uppercase tracking-[0.2em] mb-1">Residential Oversight</h2>
            <h1 className="text-3xl font-black text-primary tracking-tight">
              Warden Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100 font-bold text-xs uppercase tracking-widest text-primary/60">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Live Status Tracking
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {statsCards.map((card, idx) => (
            <Card key={idx} className="group relative overflow-hidden">
              <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
                <card.icon size={80} />
              </div>
              <div className={`w-12 h-12 rounded-2xl ${card.bgColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-500`}>
                <card.icon className={`${card.color} w-6 h-6`} />
              </div>
              <p className="text-3xl font-black text-primary tracking-tighter mb-1">{card.value}</p>
              <p className="text-[10px] font-extrabold text-primary/30 uppercase tracking-widest">{card.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8">
          
          {/* Active Leaves Table */}
          <Card title="Active Leave Status" subtitle="Students currently away from campus">
            <Table
              headers={["Student", "Department", "Duration", "Status"]}
              data={activeLeaves}
              renderRow={(l) => (
                <tr key={l._id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-primary">{l.studentId?.name}</p>
                    <p className="text-[10px] uppercase font-bold text-primary/20 tracking-wider">Identity Verified</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-primary/60">{l.studentId?.department}</p>
                    <p className="text-[10px] font-bold text-primary/20 tracking-wide uppercase">Year {l.studentId?.year}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-orange-600">
                    {new Date(l.fromDate).toLocaleDateString()} — {new Date(l.toDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                      On leave
                    </span>
                  </td>
                </tr>
              )}
              emptyMessage="No students are currently tracked as active on leave."
            />
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Approved History */}
            <Card title="Approval Log" subtitle="Historical record of processed leaves">
              <div className="overflow-hidden rounded-xl border border-gray-50">
                <Table
                  headers={["Student", "Period"]}
                  data={approvedLeaves.slice(0, 5)}
                  renderRow={(l) => (
                    <tr key={l._id} className="hover:bg-surface/50 transition-colors">
                       <td className="px-6 py-4">
                        <p className="text-sm font-bold text-primary/80">{l.studentId?.name}</p>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-primary/40">
                         {new Date(l.fromDate).toLocaleDateString()} - {new Date(l.toDate).toLocaleDateString()}
                      </td>
                    </tr>
                  )}
                  emptyMessage="No approval logs found."
                />
              </div>
              <Button variant="ghost" className="mt-4 w-full text-[10px] uppercase font-black space-x-2">
                <span>View Full Registry</span>
                <ArrowRight size={14} />
              </Button>
            </Card>

            {/* Attendance Aggregation */}
            <Card title="Attendance Health" subtitle="Aggregated academic presence records">
               <div className="overflow-hidden rounded-xl border border-gray-50">
                  <Table
                    headers={["Student", "Compliance"]}
                    data={attendanceRecords.slice(0, 5)}
                    renderRow={(att) => {
                      const percentage = att.totalLecturesByFaculty > 0 ? ((att.lectureAttended / att.totalLecturesByFaculty) * 100).toFixed(0) : 0;
                      return (
                        <tr key={att.student?._id} className="hover:bg-surface/50 transition-colors">
                           <td className="px-6 py-4">
                            <p className="text-sm font-bold text-primary/80">{att.student?.name}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-1.5 w-20 bg-surface rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${percentage < 75 ? 'bg-red-500' : 'bg-green-500'}`} 
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className={`text-[10px] font-black ${percentage < 75 ? 'text-red-500' : 'text-green-500'}`}>
                                {percentage}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    }}
                    emptyMessage="Syncing attendance data..."
                  />
                </div>
            </Card>
          </div>

        </div>
      </div>
    </DashboardShell>
  );
};

export default WardenHome;
