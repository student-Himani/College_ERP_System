import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { getAllWarden, deleteWarden } from "../../../redux/actions/adminActions";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminPageCard from "../common/AdminPageCard";

const DeleteWarden = () => {
  const dispatch = useDispatch();
  const wardens = useSelector((state) => state.admin.allWarden) || [];
  const [selectedWardens, setSelectedWardens] = useState([]);

  useEffect(() => {
    dispatch(getAllWarden());
  }, [dispatch]);

  const handleCheckboxChange = (id) => {
    setSelectedWardens((prev) =>
      prev.includes(id) ? prev.filter((wId) => wId !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (selectedWardens.length > 0) {
      if (window.confirm("Are you sure you want to delete selected wardens?")) {
        dispatch(deleteWarden(selectedWardens));
        setSelectedWardens([]);
      }
    } else {
      alert("Please select at least one warden");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <AdminPageHeader
          icon={Trash2}
          badge="Hostel"
          title="Delete Wardens"
          description="Select warden accounts to remove from the system."
        />
        <button
          type="button"
          onClick={handleDelete}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shrink-0"
        >
          Delete Selected
        </button>
      </div>

      <AdminPageCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
                <th className="px-6 py-3 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">Select</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">Sr.No</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">Username</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {wardens.length > 0 ? (
                wardens.map((war, idx) => (
                  <tr key={war._id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedWardens.includes(war._id)}
                        onChange={() => handleCheckboxChange(war._id)}
                        className="w-4 h-4 rounded border-[#D1D5DB] text-[#5B4B8A] focus:ring-[#5B4B8A]"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{idx + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1F2937]">{war.name}</td>
                    <td className="px-6 py-4 text-sm text-[#1F2937]">{war.username}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-[#6B7280]">
                    No wardens found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminPageCard>
    </div>
  );
};

export default DeleteWarden;
