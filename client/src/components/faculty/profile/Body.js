import React from "react";
import { ShieldCheck, Camera } from "lucide-react";
import { Avatar } from "@mui/material";
import Data from "./Data";
import { useNavigate } from "react-router-dom";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const faculty = user?.result || user?.faculty;
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[10px] font-extrabold text-primary/30 uppercase tracking-[0.2em] mb-1">Faculty Identity</h2>
          <h1 className="text-3xl font-black text-primary tracking-tight">
            Professional Profile
          </h1>
        </div>
        <Button 
          variant="outline" 
          icon={ShieldCheck}
          onClick={() => navigate("/faculty/update")}
          className="rounded-xl border-dashed hover:border-solid transition-all"
        >
          Update Credentials
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
                    src={faculty?.avatar} 
                    sx={{ width: '100%', height: '100%', borderRadius: 0 }} 
                  />
               </div>
               <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform">
                  <Camera size={14} />
               </button>
            </div>

            <h3 className="text-xl font-black text-primary text-center leading-tight mb-1">
              {faculty?.name}
            </h3>
            <p className="text-xs font-bold text-primary/30 uppercase tracking-widest text-center">
              Faculty ID: {faculty?.registrationNumber || faculty?.username}
            </p>

            <div className="mt-8 pt-8 border-t border-gray-50 w-full flex flex-col gap-3">
               <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-extrabold text-primary/20 uppercase tracking-widest">Department</span>
                  <span className="text-xs font-black text-primary">{faculty?.department}</span>
               </div>
               <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-extrabold text-primary/20 uppercase tracking-widest">Designation</span>
                  <span className="text-xs font-black text-primary">{faculty?.designation || "Faculty"}</span>
               </div>
               <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-extrabold text-primary/20 uppercase tracking-widest">Joining Year</span>
                  <span className="text-xs font-black text-primary/60">{faculty?.joiningYear || "N/A"}</span>
               </div>
            </div>
          </Card>

          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/5">
             <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-primary/40" size={20} />
                <h4 className="text-xs font-black text-primary uppercase tracking-widest leading-none">Security Status</h4>
             </div>
             <div className="h-1.5 w-full bg-white rounded-full overflow-hidden mb-3">
                <div className="h-full w-full bg-green-500 rounded-full" />
             </div>
             <p className="text-[10px] font-bold text-primary/30 uppercase tracking-widest text-center border-t border-primary/5 pt-3">Identity Verified & Verified</p>
          </div>
        </div>

        {/* Right Aspect: Detailed Information */}
        <div className="lg:col-span-3">
          <Card title="Institutional Registry" subtitle="Complete record of professional demographics and contact details">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mt-10">
              <Data label="Full Legal Name" value={faculty?.name} />
              <Data label="Identity Number" value={faculty?.registrationNumber || faculty?.username} />
              <Data label="Official Email" value={faculty?.email} />
              <Data label="Department" value={faculty?.department} />
              <Data label="Date of Birth" value={faculty?.dob} />
              <Data label="Primary Contact" value={faculty?.contactNumber} />
              <Data label="Gender Identity" value={faculty?.gender} />
              <Data label="Designation" value={faculty?.designation} />
            </div>
          </Card>

          <div className="mt-8 flex justify-end">
             <p className="text-[10px] font-bold text-primary/10 uppercase tracking-[0.3em]">Corporate SaaS ERP Professional Suite</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
