import React, { useEffect, useState, useMemo } from "react";
import { BookOpen, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import Card from "../../ui/Card";
import Table from "../../ui/Table";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const store = useSelector((state) => state);

  const attendanceState = useSelector((state) => state.student.attendance);
  
  const attendance = useMemo(() => {
    return attendanceState?.result || attendanceState || [];
  }, [attendanceState]);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (attendance !== undefined || Object.keys(error).length !== 0) {
      setLoading(false);
    }
  }, [attendance, error]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[10px] font-extrabold text-primary/30 uppercase tracking-[0.2em] mb-1">Academic Presence</h2>
          <h1 className="text-3xl font-black text-primary tracking-tight">
            Attendance Overview
          </h1>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100 font-bold text-xs uppercase tracking-widest text-primary/60">
          <BookOpen className="w-4 h-4 text-accent" />
          Live Academic Registry
        </div>
      </div>

      <Card 
        title="Attendance Insights" 
        subtitle="Detailed breakdown of presence across all enrolled subjects"
      >
        <div className="mt-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Spinner message="Retrieving Registry..." height={40} width={40} color="#5B4B8A" />
            </div>
          ) : error.message || error.notestError ? (
            <div className="flex flex-col items-center justify-center py-20 bg-red-50 rounded-2xl border border-red-100">
              <AlertCircle size={48} className="text-red-500 mb-4" />
              <p className="text-sm font-bold text-red-600 uppercase tracking-widest">
                {error.message || error.notestError}
              </p>
            </div>
          ) : (
            <Table
              headers={["Subject", "Engagement", "Performance", "Requirement Status"]}
              data={attendance}
              renderRow={(res, idx) => {
                const safeTotal = res.total > 0 ? res.total : 0;
                const safeAttended = res.attended > safeTotal ? safeTotal : res.attended;
                const percentage = safeTotal > 0 ? ((safeAttended / safeTotal) * 100).toFixed(1) : "0.0";
                const isEligible = parseFloat(percentage) >= 75;

                return (
                  <tr key={idx} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4">
                       <p className="text-sm font-black text-primary">{res.subjectName || res.subjectCode || "N/A"}</p>
                       <p className="text-[10px] font-extrabold text-primary/30 uppercase tracking-widest">{res.subjectCode || "Code N/A"}</p>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-primary/60">{safeAttended} / {safeTotal}</span>
                          <div className="w-24 h-1.5 bg-surface rounded-full overflow-hidden hidden sm:block">
                             <div 
                                className={`h-full rounded-full transition-all duration-1000 ${isEligible ? 'bg-green-500' : 'bg-red-500'}`}
                                style={{ width: `${percentage}%` }}
                             />
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`text-sm font-black ${isEligible ? 'text-green-600' : 'text-red-600'}`}>
                          {percentage}%
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       {isEligible ? (
                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <CheckCircle2 size={12} /> Eligible
                         </div>
                       ) : (
                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <XCircle size={12} /> Defaulter
                         </div>
                       )}
                    </td>
                  </tr>
                );
              }}
              emptyMessage="No attendance records found for the current semester."
            />
          )}
        </div>
      </Card>

      <div className="bg-primary/5 rounded-2xl p-6 border border-primary/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
           <AlertCircle className="text-primary/40" size={20} />
           <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">
              A minimum of 75% attendance is required per subject to remain eligible for final examinations.
           </p>
        </div>
        <p className="text-[10px] font-black text-primary/20 uppercase tracking-[0.2em]">Institutional Policy Section 4.2</p>
      </div>
    </div>
  );
};

export default Body;
