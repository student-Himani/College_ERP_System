// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getNotice } from "../../redux/actions/adminActions";
// import {
//   getAttendance,
//   getSubject,
//   getTestResult,
// } from "../../redux/actions/studentActions";

// import Body from "./Body";
// import Header from "./Header";
// import Sidebar from "./Sidebar";

// const StudentHome = () => {
// //  const user = JSON.parse(localStorage.getItem("user")); 
//  const user = JSON.parse(localStorage.getItem("user")) || {};

//   if (!user) {
//   return <div>Please login first</div>;
//   }

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getSubject(user.result.department, user.result.year));
//     dispatch(
//       getTestResult(
//         user.result.department,
//         user.result.year,
//         user.result.section
//       )
//     );
//     dispatch(
//       getAttendance(
//         user.result.department,
//         user.result.year,
//         user.result.section
//       )
//     );
//     dispatch(getNotice());
//   }, [dispatch]);

//   return (
//     <div className="bg-[#d6d9e0] h-screen flex items-center justify-center">
//       <div className="flex flex-col  bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 overflow-y-hidden">
//         <Header />
//         <div className="flex flex-[0.95]">
//           <Sidebar />
//           <Body />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentHome;
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { 
  Home, 
  User, 
  FileText, 
  ClipboardCheck, 
  BookOpen 
} from "lucide-react";

import { getNotice } from "../../redux/actions/adminActions";
import {
  getAttendance,
  getSubject,
  getTestResult,
} from "../../redux/actions/studentActions";

import Body from "./Body";
import DashboardShell from "../layout/DashboardShell";

const StudentHome = () => {
  const dispatch = useDispatch();

  const storedUser = localStorage.getItem("user");
  let user = null;
  let hasStorageError = false;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage");
    localStorage.removeItem("user");
    hasStorageError = true;
  }

  const student = user?.student;

  useEffect(() => {
    if (student?.department && student?.year && student?.section) {
      dispatch(getSubject(student.department, student.year));
      dispatch(getTestResult(student.department, student.year, student.section));
      dispatch(getAttendance(student.department, student.year, student.section));
      dispatch(getNotice());
    }
  }, [dispatch, student]);

  if (hasStorageError) return <Navigate to="/login" />;
  if (!user || !user.token) return <Navigate to="/login" />;
  if (!student) return <div className="p-8 text-primary/40 font-bold">Invalid session. Please login again.</div>;

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

export default StudentHome;