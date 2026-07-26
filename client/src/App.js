import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/common/LoadingScreen";
import AdminLayout from "./components/layout/AdminLayout";

import AddAdmin from "./components/admin/addAdmin/AddAdmin";
import AddDepartment from "./components/admin/addDepartment/AddDepartment";
import AddFaculty from "./components/admin/addFaculty/AddFaculty";
import AddStudent from "./components/admin/addStudent/AddStudent";
import AddSubject from "./components/admin/addSubject/AddSubject";
import AdminHome from "./components/admin/AdminHome";

import GetFaculty from "./components/admin/getFaculty/GetFaculty";
import GetStudent from "./components/admin/getStudent/GetStudent";
import GetSubject from "./components/admin/getSubject/GetSubject";
import AdminProfile from "./components/admin/profile/Profile";
import AdminFirstTimePassword from "./components/admin/profile/update/firstTimePassword/FirstTimePassword";
import AdminPassword from "./components/admin/profile/update/password/Password";

import AdminUpdate from "./components/admin/profile/update/Update";
import CreateTest from "./components/faculty/createTest/CreateTest";
import FacultyHome from "./components/faculty/FacultyHome";
import MarkAttendance from "./components/faculty/markAttendance/MarkAttendance";
import FacultyProfile from "./components/faculty/profile/Profile";
import FacultyFirstTimePassword from "./components/faculty/profile/update/firstTimePassword/FirstTimePassword";
import FacultyPassword from "./components/faculty/profile/update/password/Password";
import FacultyUpdate from "./components/faculty/profile/update/Update";
import UploadMarks from "./components/faculty/uploadMarks/UploadMarks";

import LandingPage from "./components/landing/LandingPage";
import UnifiedLogin from "./components/login/UnifiedLogin";
import ProtectedRoute from "./ProtectedRoute";

// Keep old login pages as fallback if needed
import AdminLogin from "./components/login/adminLogin/AdminLogin";
import FacultyLogin from "./components/login/facultyLogin/FacultyLogin";


import StudentLogin from "./components/login/studentLogin/StudentLogin";
import StudentFirstTimePassword from "./components/student/profile/update/firstTimePassword/FirstTimePassword";
import StudentHome from "./components/student/StudentHome";
import StudentProfile from "./components/student/profile/Profile";
import StudentUpdate from "./components/student/profile/update/Update";
import StudentPassword from "./components/student/profile/update/password/Password";
import SubjectList from "./components/student/subjectList/SubjectList";
import TestResult from "./components/student/testResult/TestResult";
import Attendance from "./components/student/attendance/Attendance";
import DeleteAdmin from "./components/admin/deleteAdmin/DeleteAdmin";
import DeleteDepartment from "./components/admin/deleteDepartment/DeleteDepartment";
import DeleteFaculty from "./components/admin/deleteFaculty/DeleteFaculty";
import DeleteStudent from "./components/admin/deleteStudent/DeleteStudent";
import DeleteSubject from "./components/admin/deleteSubject/DeleteSubject";
import CreateNotice from "./components/admin/createNotice/CreateNotice";

// --- New Imports ---
import AddWarden from "./components/admin/addWarden/AddWarden";
import GetWarden from "./components/admin/getWarden/GetWarden";
import DeleteWarden from "./components/admin/deleteWarden/DeleteWarden";
import HostelLeaveApprovalAdmin from "./components/admin/hostelLeave/HostelLeaveApprovalAdmin";
import HostelAttendanceAdmin from "./components/admin/hostelAttendance/HostelAttendanceAdmin";

import HostelLeaveApprovalFaculty from "./components/faculty/hostelLeave/HostelLeaveApprovalFaculty";

import HostelLeave from "./components/student/hostelLeave/HostelLeave";
import HostelAttendance from "./components/student/hostelAttendance/HostelAttendance";

import WardenHome from "./components/warden/WardenHome";
import HostelLeaveApprovalWarden from "./components/warden/HostelLeaveApprovalWarden";
import HostelAttendanceWarden from "./components/warden/HostelAttendanceWarden";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force Light Mode by default if not set
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // 3 Second Loading Screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <Routes>
        {/* New Modern Routes */}
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<UnifiedLogin />} />

        {/* Admin Routes (protected) - Nested routes with AdminLayout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<AdminHome />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="update" element={<AdminUpdate />} />
          <Route path="update/password" element={<AdminPassword />} />
          <Route path="updatepassword" element={<AdminFirstTimePassword />} />
          <Route path="createnotice" element={<CreateNotice />} />
          <Route path="addadmin" element={<AddAdmin />} />
          <Route path="deleteadmin" element={<DeleteAdmin />} />
          <Route path="adddepartment" element={<AddDepartment />} />
          <Route path="deletedepartment" element={<DeleteDepartment />} />
          <Route path="addfaculty" element={<AddFaculty />} />
          <Route path="deletefaculty" element={<DeleteFaculty />} />
          <Route path="deletestudent" element={<DeleteStudent />} />
          <Route path="deletesubject" element={<DeleteSubject />} />
          <Route path="allfaculty" element={<GetFaculty />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="addsubject" element={<AddSubject />} />
          <Route path="allsubject" element={<GetSubject />} />
          <Route path="allstudent" element={<GetStudent />} />
          <Route path="addwarden" element={<AddWarden />} />
          <Route path="allwarden" element={<GetWarden />} />
          <Route path="deletewarden" element={<DeleteWarden />} />
          <Route path="hostelleave" element={<HostelLeaveApprovalAdmin />} />
          <Route path="hostelattendance" element={<HostelAttendanceAdmin />} />
        </Route>

        {/* Legacy admin routes for backward compatibility */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
        </Route>

        {/* Faculty Routes (protected) */}

        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute allowedRole="faculty">
              <FacultyHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/home"
          element={
            <ProtectedRoute allowedRole="faculty">
              <FacultyHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/password"
          element={
            <ProtectedRoute allowedRole="faculty">
              <FacultyFirstTimePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/profile"
          element={
            <ProtectedRoute allowedRole="faculty">
              <FacultyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/update"
          element={
            <ProtectedRoute allowedRole="faculty">
              <FacultyUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/update/password"
          element={
            <ProtectedRoute allowedRole="faculty">
              <FacultyPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/createtest"
          element={
            <ProtectedRoute allowedRole="faculty">
              <CreateTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/uploadmarks"
          element={
            <ProtectedRoute allowedRole="faculty">
              <UploadMarks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/markattendance"
          element={
            <ProtectedRoute allowedRole="faculty">
              <MarkAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/hostelleave"
          element={
            <ProtectedRoute allowedRole="faculty">
              <HostelLeaveApprovalFaculty />
            </ProtectedRoute>
          }
        />

        {/* Student Routes (protected) */}

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/home"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/password"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentFirstTimePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/update"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/update/password"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/subjectlist"
          element={
            <ProtectedRoute allowedRole="student">
              <SubjectList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/testresult"
          element={
            <ProtectedRoute allowedRole="student">
              <TestResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute allowedRole="student">
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/hostelleave"
          element={
            <ProtectedRoute allowedRole="student">
              <HostelLeave />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/hostelattendance"
          element={
            <ProtectedRoute allowedRole="student">
              <HostelAttendance />
            </ProtectedRoute>
          }
        />

        {/* Warden Routes (protected) */}
        <Route
          path="/warden-dashboard"
          element={
            <ProtectedRoute allowedRole="warden">
              <WardenHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/warden/home"
          element={
            <ProtectedRoute allowedRole="warden">
              <WardenHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/warden/hostelleave"
          element={
            <ProtectedRoute allowedRole="warden">
              <HostelLeaveApprovalWarden />
            </ProtectedRoute>
          }
        />
        <Route
          path="/warden/hostelattendance"
          element={
            <ProtectedRoute allowedRole="warden">
              <HostelAttendanceWarden />
            </ProtectedRoute>
          }
        />

        {/* Legacy routes for backward compatibility */}
        <Route path="/login/adminlogin" element={<AdminLogin />} />
        <Route path="/login/facultylogin" element={<FacultyLogin />} />
        <Route path="/login/studentlogin" element={<StudentLogin />} />
      </Routes>
    </>
  );
};

export default App;
