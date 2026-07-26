import React from "react";

const AdminPageCard = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default AdminPageCard;
