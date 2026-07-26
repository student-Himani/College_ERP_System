import React from "react";
import {   
  Home, 
  User, 
  FileText, 
  ClipboardCheck, 
  BookOpen 
} from "lucide-react";
import Body from "./Body";
import DashboardShell from "../../layout/DashboardShell";

const Profile = () => {
  const menuItems = [
    {
      section: "Main",
      items: [
        { path: "/student/home", icon: Home, label: "Dashboard" },
        { path: "/student/profile", icon: User, label: "Profile" },
      ],
    },
    {
      section: "Academics",
      items: [
        { path: "/student/testresult", icon: FileText, label: "Test Results" },
        { path: "/student/attendance", icon: ClipboardCheck, label: "Attendance" },
        { path: "/student/subjectlist", icon: BookOpen, label: "Subject List" },
        { path: "/student/hostelleave", icon: FileText, label: "Hostel Leave" },
        { path: "/student/hostelattendance", icon: ClipboardCheck, label: "Hostel Attendance" },
      ],
    },
  ];

  return (
    <DashboardShell menuItems={menuItems} role="Student">
      <Body />
    </DashboardShell>
  );
};

export default Profile;
