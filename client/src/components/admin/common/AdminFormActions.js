import React from "react";

const AdminFormActions = ({ onClear, submitLabel = "Submit", clearLabel = "Clear" }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-6 mt-6 border-t border-[#E5E7EB]">
      <button
        type="submit"
        className="min-w-[120px] px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#5B4B8A] hover:bg-[#4A3A7A] transition-colors shadow-sm"
      >
        {submitLabel}
      </button>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="min-w-[120px] px-6 py-2.5 rounded-lg text-sm font-semibold text-[#5B4B8A] bg-[#F3F0FA] border border-[#E5E7EB] hover:bg-[#E8E0F5] transition-colors"
        >
          {clearLabel}
        </button>
      )}
    </div>
  );
};

export default AdminFormActions;
