import React from "react";
import { 
  Home, 
  User, 
  PlusCircle, 
  FileText, 
  ClipboardCheck 
} from "lucide-react";
import Body from "./Body";
import DashboardShell from "../../layout/DashboardShell";

const Profile = () => {
  const menuItems = [
    {
      section: "Main",
      items: [
        { path: "/faculty/home", icon: Home, label: "Dashboard" },
        { path: "/faculty/profile", icon: User, label: "Profile" },
      ],
    },
    {
      section: "Academics",
      items: [
        { path: "/faculty/createtest", icon: PlusCircle, label: "Create Test" },
        { path: "/faculty/uploadmarks", icon: FileText, label: "Upload Marks" },
        { path: "/faculty/markattendance", icon: ClipboardCheck, label: "Mark Attendance" },
        { path: "/faculty/hostelleave", icon: ClipboardCheck, label: "Leave Approvals" },
      ],
    },
  ];

  return (
    <DashboardShell menuItems={menuItems} role="Faculty">
      <Body />
    </DashboardShell>
  );
};

export default Profile;
