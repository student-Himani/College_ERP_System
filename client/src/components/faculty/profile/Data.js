import React from "react";

const Data = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-[10px] font-extrabold text-primary/30 uppercase tracking-[0.2em]">
        {label}
      </h3>
      <div className="px-4 py-3 bg-white rounded-xl border border-gray-50 shadow-sm text-sm font-bold text-primary/70">
        {value || "Not specified"}
      </div>
    </div>
  );
};

export default Data;
