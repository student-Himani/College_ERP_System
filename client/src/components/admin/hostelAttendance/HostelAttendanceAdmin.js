import React, { useEffect, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { getAdminHostelAttendance } from "../../../redux/api";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminPageCard from "../common/AdminPageCard";
import AdminStatusMessage from "../common/AdminStatusMessage";

const HostelAttendanceAdmin = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const { data } = await getAdminHostelAttendance();
        setAttendanceList(data.result || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={ClipboardCheck}
        badge="Hostel"
        title="Hostel Attendance"
        description="View hostel attendance records submitted by wardens."
      />

      <AdminPageCard className="p-0 overflow-hidden">
        {loading ? (
          <AdminStatusMessage loading loadingMessage="Loading attendance records" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
                  <th className="px-6 py-3 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {attendanceList.length > 0 ? (
                  attendanceList.map((item) => (
                    <tr key={item._id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-[#1F2937]">
                        {item.studentId?.name || "Unknown Student"}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">{item.date}</td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">{item.time}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 uppercase">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-[#6B7280]">
                      No hostel attendance records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </AdminPageCard>
    </div>
  );
};

export default HostelAttendanceAdmin;
