import React from "react";
import { ShieldCheck, Camera } from "lucide-react";
import { Avatar } from "@mui/material";
import Data from "./Data";
import { useNavigate } from "react-router-dom";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const student = user?.result || user?.student;
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[10px] font-extrabold text-primary/30 uppercase tracking-[0.2em] mb-1">Student Identity</h2>
          <h1 className="text-3xl font-black text-primary tracking-tight">
            Personal Profile
          </h1>
        </div>
        <Button 
          variant="outline" 
          icon={ShieldCheck}
          onClick={() => navigate("/student/update")}
          className="rounded-xl border-dashed hover:border-solid transition-all"
        >
          Modify Security Details
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Aspect: Identity Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="flex flex-col items-center py-10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-24 bg-surface group-hover:bg-primary/5 transition-colors" />
            
            <div className="relative z-10 mb-6">
               <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden">
                  <Avatar 
                    src={student?.avatar} 
                    sx={{ width: '100%', height: '100%', borderRadius: 0 }} 
                  />
               </div>
               <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform">
                  <Camera size={14} />
               </button>
            </div>

            <h3 className="text-xl font-black text-primary text-center leading-tight mb-1">
              {student?.name}
            </h3>
            <p className="text-xs font-bold text-primary/30 uppercase tracking-widest text-center">
              Student ID: {student?.username}
            </p>

            <div className="mt-8 pt-8 border-t border-gray-50 w-full flex flex-col gap-3">
               <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-extrabold text-primary/20 uppercase tracking-widest">Year</span>
                  <span className="text-xs font-black text-primary">{student?.year}</span>
               </div>
               <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-extrabold text-primary/20 uppercase tracking-widest">Section</span>
                  <span className="text-xs font-black text-primary">{student?.section}</span>
               </div>
               <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-extrabold text-primary/20 uppercase tracking-widest">Department</span>
                  <span className="text-xs font-black text-primary/60">{student?.department}</span>
               </div>
            </div>
          </Card>

          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/5">
             <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-primary/40" size={20} />
                <h4 className="text-xs font-black text-primary uppercase tracking-widest leading-none">Status Level</h4>
             </div>
             <div className="h-1.5 w-full bg-white rounded-full overflow-hidden mb-3">
                <div className="h-full w-4/5 bg-primary rounded-full" />
             </div>
             <p className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">Academic Eligibility Clear</p>
          </div>
        </div>

        {/* Right Aspect: Detailed Information */}
        <div className="lg:col-span-3">
          <Card title="Registry Details" subtitle="Full institutional photographic and demographic data">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mt-10">
              <Data label="Full Legal Name" value={student?.name} />
              <Data label="Institutional Email" value={student?.email} />
              <Data label="Department Domain" value={student?.department} />
              <Data label="Date of Birth" value={student?.dob} />
              <Data label="Contact Registry" value={student?.contactNumber} />
              <Data label="Academic Batch" value={student?.batch} />
              <Data label="Secular Division" value={student?.section} />
              <Data label="Primary Guardian" value={student?.fatherName} />
              <Data label="Maternal Guardian" value={student?.motherName} />
              <Data label="Guardian Contact" value={student?.fatherContactNumber} />
            </div>
          </Card>

          <div className="mt-8 flex justify-end">
             <p className="text-[10px] font-bold text-primary/10 uppercase tracking-[0.3em]">Institutional Data Management System v2.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
