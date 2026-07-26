import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users } from "lucide-react";
import { getAllWarden } from "../../../redux/actions/adminActions";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminPageCard from "../common/AdminPageCard";
import Table from "../../ui/Table";

const GetWarden = () => {
  const dispatch = useDispatch();
  const wardens = useSelector((state) => state.admin.allWarden) || [];

  useEffect(() => {
    dispatch(getAllWarden());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={Users}
        badge="Hostel"
        title="All Wardens"
        description="View all registered warden accounts and their assigned hostels."
      />
      <AdminPageCard className="p-0 overflow-hidden">
        <Table
          headers={["Sr.No", "Name", "Username", "Email", "Hostel"]}
          data={wardens}
          emptyMessage="No wardens found"
          renderRow={(war) => (
            <>
              <td className="px-6 py-4 text-sm text-[#6B7280]">{wardens.indexOf(war) + 1}</td>
              <td className="px-6 py-4 text-sm font-medium text-[#1F2937]">{war.name}</td>
              <td className="px-6 py-4 text-sm text-[#1F2937]">{war.username}</td>
              <td className="px-6 py-4 text-sm text-[#1F2937]">{war.email}</td>
              <td className="px-6 py-4 text-sm text-[#1F2937]">{war.hostelName}</td>
            </>
          )}
        />
      </AdminPageCard>
    </div>
  );
};

export default GetWarden;
