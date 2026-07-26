import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { 
  Home, 
  User, 
  FileText, 
  ClipboardCheck, 
  BookOpen 
} from "lucide-react";
import { getSubject } from "../../../redux/actions/studentActions";
import Body from "./Body";
import DashboardShell from "../../layout/DashboardShell";

const SubjectList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const student = user?.result || user?.student;
  const dispatch = useDispatch();

  useEffect(() => {
    if (student) {
      dispatch(getSubject(student.department, student.year));
    }
  }, [dispatch, student]);

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

export default SubjectList;
