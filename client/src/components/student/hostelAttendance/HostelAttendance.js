import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  getStudentHostelAttendance,
  markHostelAttendance,
} from "../../../redux/api";

const HostelAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadAttendance = async () => {
    try {
      setFetching(true);
      const { data } = await getStudentHostelAttendance();
      setAttendanceList(data.result || []);
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.response?.data?.message || "Unable to load attendance history",
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const handleMarkAttendance = () => {
    if (!navigator.geolocation) {
      setMessage({
        type: "error",
        text: "Geolocation is not supported in this browser",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const payload = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          const { data } = await markHostelAttendance(payload);
          setMessage({
            type: "success",
            text: data.message || "Attendance marked successfully",
          });
          await loadAttendance();
        } catch (error) {
          const backendMessage = error?.response?.data?.message;
          let errorMessage = backendMessage || "Unable to mark hostel attendance";

          if (backendMessage === "You are outside campus") {
            errorMessage = "Outside campus";
          } else if (backendMessage === "Attendance allowed only between 7 PM to 9 PM") {
            errorMessage = "Time not allowed";
          }

          setMessage({ type: "error", text: errorMessage });
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
        setMessage({
          type: "error",
          text: error.message || "Unable to fetch your current location",
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Hostel Attendance</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Mark your hostel attendance between 7 PM and 9 PM from campus.
                  </p>
                </div>
                <button
                  onClick={handleMarkAttendance}
                  disabled={loading}
                  className="px-6 py-3 bg-[#0B1F3A] text-white rounded-lg hover:bg-[#12325d] disabled:opacity-70"
                >
                  {loading ? "Marking..." : "Mark Hostel Attendance"}
                </button>
              </div>

              {message.text && (
                <div
                  className={`mt-4 px-4 py-3 rounded-md text-sm font-medium ${
                    message.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Attendance History</h2>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 uppercase text-sm leading-normal">
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Time</th>
                    <th className="py-3 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {attendanceList.map((item) => (
                    <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">{item.date}</td>
                      <td className="py-3 px-4">{item.time}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!fetching && attendanceList.length === 0 && (
                    <tr>
                      <td colSpan="3" className="py-4 text-center">
                        No hostel attendance records found.
                      </td>
                    </tr>
                  )}
                  {fetching && (
                    <tr>
                      <td colSpan="3" className="py-4 text-center">
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

export default HostelAttendance;
