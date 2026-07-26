import React, { useEffect, useState, useMemo } from "react";
import { BookOpen, AlertCircle, Bookmark } from "lucide-react";
import { useSelector } from "react-redux";
import Spinner from "../../../utils/Spinner";
import Card from "../../ui/Card";

const Body = () => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const store = useSelector((state) => state);

  const subjectsState = useSelector((state) => state.student.subjects);
  
  const subjects = useMemo(() => {
    return subjectsState?.result || subjectsState || [];
  }, [subjectsState]);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (subjects !== undefined || Object.keys(error).length !== 0) {
      setLoading(false);
    }
  }, [subjects, error]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[10px] font-extrabold text-primary/30 uppercase tracking-[0.2em] mb-1">Academic Curriculum</h2>
          <h1 className="text-3xl font-black text-primary tracking-tight">
            Enrolled Subjects
          </h1>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100 font-bold text-xs uppercase tracking-widest text-primary/60">
          <BookOpen className="w-4 h-4 text-accent" />
          Active Semester
        </div>
      </div>

      <Card 
        title="Curriculum Overview" 
        subtitle="Review your registered academic modules and lecture quotas"
      >
        <div className="mt-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 font-bold text-primary/20 uppercase tracking-widest text-xs">
              <Spinner message="Syncing Curriculum..." height={40} width={40} color="#5B4B8A" />
            </div>
          ) : error.noSubjectError ? (
            <div className="flex flex-col items-center justify-center py-20 bg-orange-50 rounded-2xl border border-orange-100">
              <AlertCircle size={48} className="text-orange-500 mb-4" />
              <p className="text-sm font-bold text-orange-600 uppercase tracking-widest">
                {error.noSubjectError}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-50">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-surface/50">
                        <th className="px-6 py-4 text-[10px] font-black text-primary/30 uppercase tracking-widest">Priority</th>
                        <th className="px-6 py-4 text-[10px] font-black text-primary/30 uppercase tracking-widest">Module Info</th>
                        <th className="px-6 py-4 text-[10px] font-black text-primary/30 uppercase tracking-widest text-center">Lecture Quota</th>
                     </tr>
                  </thead>
                  <tbody>
                     {subjects?.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-surface/30 transition-colors border-t border-gray-50 group">
                           <td className="px-6 py-4 font-black text-primary/10 group-hover:text-accent transition-colors">
                              {(idx + 1).toString().padStart(2, '0')}
                           </td>
                           <td className="px-6 py-4">
                              <p className="text-sm font-black text-primary">{sub.subjectName || sub.subjectCode || "N/A"}</p>
                              <p className="text-[10px] font-extrabold text-primary/30 uppercase tracking-widest">{sub.subjectCode || "Code N/A"}</p>
                           </td>
                           <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center gap-2 px-3 py-1 bg-surface font-black text-primary/60 rounded-lg text-xs">
                                 {sub.totalLectures} Units
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          )}
        </div>
      </Card>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="p-6 bg-white rounded-2xl border border-gray-50 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
               <Bookmark size={20} />
            </div>
            <div>
               <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-1">Mandatory</h4>
               <p className="text-[10px] font-bold text-primary/30 leading-relaxed uppercase">Core curriculum modules required for degree compliance.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Body;
