import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipboardCheck, Check, X, Calendar, User as UserIcon } from "lucide-react";
import { getAdminPendingLeaves, hodApprove, rejectLeave } from "../../../redux/actions/hostelLeaveActions";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminPageCard from "../common/AdminPageCard";

const HostelLeaveApprovalAdmin = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const adminData = useSelector((state) => state.admin?.admin) || user?.admin || user?.result;
  const leaves = useSelector((state) => state.hostelLeave.leaves) || [];

  useEffect(() => {
    dispatch(getAdminPendingLeaves());
  }, [dispatch]);

  const handleApprove = (leaveId) => {
    if (adminData?._id) {
      dispatch(hodApprove(leaveId, adminData._id));
    }
  };

  const handleReject = (leaveId) => {
    dispatch(rejectLeave(leaveId));
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={ClipboardCheck}
        badge="Hostel"
        title="Leave Approvals"
        description="Review and action pending hostel leave requests from students."
      />

      <AdminPageCard className="p-0 overflow-hidden">
        {leaves.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
                  <th className="px-6 py-3 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
                    <span className="inline-flex items-center gap-1.5"><UserIcon size={13} /> Student</span>
                  </th>
                  <th className="px-6 py-3 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
                    <span className="inline-flex items-center gap-1.5"><Calendar size={13} /> Period</span>
                  </th>
                  <th className="px-6 py-3 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {leaves.map((l) => (
                  <tr key={l._id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#1F2937]">{l.studentId?.name}</div>
                      <div className="text-xs text-[#6B7280] mt-0.5">
                        {l.studentId?.department} · Year {l.studentId?.year}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{l.reason}</td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {new Date(l.fromDate).toLocaleDateString()} – {new Date(l.toDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {l.status === "pending" ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleApprove(l._id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                          >
                            <Check size={14} /> Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(l._id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
                          >
                            <X size={14} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="inline-flex justify-center w-full text-xs font-medium text-[#6B7280] capitalize">
                          {l.status.replace("_", " ")}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ClipboardCheck size={48} className="mb-3 text-[#5B4B8A]/20" />
            <p className="text-sm font-medium text-[#6B7280]">No pending leave requests</p>
          </div>
        )}
      </AdminPageCard>
    </div>
  );
};

export default HostelLeaveApprovalAdmin;
