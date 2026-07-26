import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentLeave, createLeave } from "../../../redux/actions/hostelLeaveActions";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useState } from "react";

const HostelLeave = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student.student) || JSON.parse(localStorage.getItem("user"))?.student;
  const leaves = useSelector((state) => state.hostelLeave.leaves) || [];

  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (student?._id) {
      dispatch(getStudentLeave(student._id));
    }
  }, [dispatch, student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student?._id) {
      alert("Error: Student ID not found. Please log in again.");
      return;
    }
    dispatch(
      createLeave({
        studentId: student._id,
        reason,
        fromDate,
        toDate,
      })
    );
    setReason("");
    setFromDate("");
    setToDate("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "text-yellow-500 bg-yellow-100";
      case "hod_approved": return "text-blue-500 bg-blue-100";
      case "coordinator_approved": return "text-purple-500 bg-purple-100";
      case "warden_approved": return "text-green-500 bg-green-100";
      case "rejected": return "text-red-500 bg-red-100";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="flex flex-col w-full h-screen overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6">
            <h1 className="mb-6 text-2xl font-bold text-gray-800">Hostel Leave Management</h1>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Apply Leave Form */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-bold">Apply for Leave</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700">Reason</label>
                    <textarea 
                      className="w-full px-3 py-2 border rounded-md" 
                      value={reason} 
                      onChange={(e) => setReason(e.target.value)} 
                      required 
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700">From Date</label>
                    <input type="date" className="w-full px-3 py-2 border rounded-md" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700">To Date</label>
                    <input type="date" className="w-full px-3 py-2 border rounded-md" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
                  </div>
                 <button
                   type="submit"
                   className="px-4 py-1.5 text-sm font-semibold text-white rounded-md w-auto 
                              bg-[#5B4B8A] hover:bg-[#4A3A7A]
                              transition-all duration-300 shadow-sm hover:shadow-md"
                 >
                   Submit Request
                 </button>
                </form>
              </div>

              {/* Status Table */}
              <div className="p-6 overflow-x-auto bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-bold">Your Leave Status</h2>
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="text-sm leading-normal uppercase bg-gray-100">
                      <th className="px-4 py-2">From</th>
                      <th className="px-4 py-2">To</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-light text-gray-600">
                    {leaves.map((l, idx) => (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-2">{new Date(l.fromDate).toLocaleDateString()}</td>
                        <td className="px-4 py-2">{new Date(l.toDate).toLocaleDateString()}</td>
                        <td className="px-4 py-2">
                          <span className={`py-1 px-3 rounded-full text-xs font-bold ${getStatusColor(l.status)}`}>
                            {l.status.replace("_", " ").toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {leaves.length === 0 && (
                      <tr><td colSpan="3" className="py-4 text-center">No leave requests found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelLeave;
