import React from "react";
import { ShieldCheck, Camera } from "lucide-react";
import { Avatar } from "@mui/material";
import Data from "./Data";
import { useNavigate } from "react-router-dom";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminPageCard from "../common/AdminPageCard";

const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = user?.result || user?.admin;
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <AdminPageHeader
          icon={ShieldCheck}
          badge="Account"
          title="Profile"
          description="Your administrative identity and contact information."
        />
        <button
          type="button"
          onClick={() => navigate("/admin/update")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#5B4B8A] bg-[#F3F0FA] border border-[#E5E7EB] hover:bg-[#E8E0F5] transition-colors shrink-0"
        >
          <ShieldCheck size={16} />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <AdminPageCard className="flex flex-col items-center py-8">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-[#F3F0FA] overflow-hidden">
                <Avatar src={admin?.avatar} sx={{ width: "100%", height: "100%" }} />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#5B4B8A] rounded-full flex items-center justify-center text-white">
                <Camera size={14} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#1F2937] text-center">{admin?.name}</h3>
            <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mt-1">
              {admin?.username}
            </p>
            <div className="mt-6 pt-6 border-t border-[#E5E7EB] w-full space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Authority</span>
                <span className="font-semibold text-[#1F2937]">Admin</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Joining Year</span>
                <span className="font-semibold text-[#1F2937]">{admin?.joiningYear || "N/A"}</span>
              </div>
            </div>
          </AdminPageCard>
        </div>

        <div className="lg:col-span-3">
          <AdminPageCard>
            <h3 className="text-base font-semibold text-[#1F2937] mb-1">Administrative Registry</h3>
            <p className="text-sm text-[#6B7280] mb-8">Core system identity and contact details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
              <Data label="Full Legal Name" value={admin?.name} />
              <Data label="System Username" value={admin?.username} />
              <Data label="Official Email" value={admin?.email} />
              <Data label="Primary Contact" value={admin?.contactNumber} />
              <Data label="Date of Birth" value={admin?.dob} />
              <Data label="Institutional Year" value={admin?.joiningYear} />
            </div>
          </AdminPageCard>
        </div>
      </div>
    </div>
  );
};

export default Body;
