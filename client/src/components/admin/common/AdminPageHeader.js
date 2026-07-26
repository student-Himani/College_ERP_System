import React from "react";

const AdminPageHeader = ({ icon: Icon, badge, title, description }) => {
  return (
    <div className="mb-6">
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F0FA] border border-[#E5E7EB] text-[#5B4B8A] text-[10px] font-semibold uppercase tracking-wider mb-3">
          {Icon && <Icon size={12} />}
          {badge}
        </span>
      )}
      <h1 className="text-2xl font-bold text-[#1F2937] tracking-tight">{title}</h1>
      {description && (
        <p className="mt-1 text-sm text-[#6B7280]">{description}</p>
      )}
    </div>
  );
};

export default AdminPageHeader;
