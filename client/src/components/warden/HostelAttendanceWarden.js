import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getAdminHostelAttendance } from "../../redux/api";

const HostelAttendanceWarden = () => {
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
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Hostel Attendance Records</h1>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 uppercase text-sm leading-normal">
                    <th className="py-3 px-4 text-left">Student Name</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Time</th>
                    <th className="py-3 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {attendanceList.map((item) => (
                    <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {item.studentId?.name || "Unknown Student"}
                      </td>
                      <td className="py-3 px-4">{item.date}</td>
                      <td className="py-3 px-4">{item.time}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!loading && attendanceList.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-4 text-center">
                        No hostel attendance records found.
                      </td>
                    </tr>
                  )}
                  {loading && (
                    <tr>
                      <td colSpan="4" className="py-4 text-center">
                        Loading attendance...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelAttendanceWarden;
