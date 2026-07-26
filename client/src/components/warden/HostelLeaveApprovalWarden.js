import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWardenPendingLeaves, wardenApprove, rejectLeave } from "../../redux/actions/hostelLeaveActions";
import Sidebar from "./Sidebar";
import Header from "./Header";

const HostelLeaveApprovalWarden = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const wardenData = useSelector((state) => state.warden?.warden) || user?.warden || user?.result;
  const leaves = useSelector((state) => state.hostelLeave.leaves) || [];

  useEffect(() => {
    dispatch(getWardenPendingLeaves());
  }, [dispatch]);

  const handleApprove = (leaveId) => {
    if (wardenData?._id) {
      dispatch(wardenApprove(leaveId, wardenData._id));
    }
  };

  const handleReject = (leaveId) => {
    dispatch(rejectLeave(leaveId));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Hostel Leave Approvals (Final)</h1>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Student</th>
                    <th className="py-3 px-6 text-left">Reason</th>
                    <th className="py-3 px-6 text-left">Period</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {leaves.map((l, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 font-medium">
                        {l.studentId?.name} <br/>
                        <span className="text-xs text-gray-500">{l.studentId?.department} - Year {l.studentId?.year}</span>
                      </td>
                      <td className="py-3 px-6">{l.reason}</td>
                      <td className="py-3 px-6">
                        {new Date(l.fromDate).toLocaleDateString()} to {new Date(l.toDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6 text-center space-x-2">
                         {l.status === "coordinator_approved" ? (
                          <>
                            <button onClick={() => handleApprove(l._id)} className="bg-green-500 text-white px-3 py-1 rounded shadow hover:bg-green-600">Final Approve</button>
                            <button onClick={() => handleReject(l._id)} className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600">Reject</button>
                          </>
                        ) : (
                          <span className="text-gray-500 italic">{l.status.replace("_", " ")}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {leaves.length === 0 && (
                    <tr><td colSpan="4" className="py-4 text-center">No pending leaves found.</td></tr>
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

export default HostelLeaveApprovalWarden;
