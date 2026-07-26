import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001/" });

API.interceptors.request.use((req) => {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    try {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser?.token) {
        req.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    } catch (error) {
      console.log("Invalid user data in localStorage");
      localStorage.removeItem("user");
      return req;
    }
  }

  return req;
});

// Admin

export const adminSignIn = (formData) => API.post("/api/admin/login", formData);

export const adminUpdatePassword = (updatedPassword) =>
  API.post("/api/admin/updatepassword", updatedPassword);

export const getAllStudent = () => API.get("/api/admin/getallstudent");

export const getAllFaculty = () => API.get("/api/admin/getallfaculty");

export const getAllAdmin = () => API.get("/api/admin/getalladmin");

export const getAllDepartment = () => API.get("/api/admin/getalldepartment");
export const getAllSubject = () => API.get("/api/admin/getallsubject");

export const updateAdmin = (updatedAdmin) =>
  API.post("/api/admin/updateprofile", updatedAdmin);

export const addAdmin = (admin) => API.post("/api/admin/addadmin", admin);
export const createNotice = (notice) =>
  API.post("/api/admin/createnotice", notice);
export const deleteAdmin = (data) => API.post("/api/admin/deleteadmin", data);
export const deleteFaculty = (data) =>
  API.post("/api/admin/deletefaculty", data);
export const deleteStudent = (data) =>
  API.post("/api/admin/deletestudent", data);
export const deleteSubject = (data) =>
  API.post("/api/admin/deletesubject", data);
export const deleteDepartment = (data) =>
  API.post("/api/admin/deletedepartment", data);

export const getAdmin = (admin) => API.post("/api/admin/getadmin", admin);

export const addDepartment = (department) =>
  API.post("/api/admin/adddepartment", department);

export const addFaculty = (faculty) =>
  API.post("/api/admin/addfaculty", faculty);

export const getFaculty = (department) =>
  API.post("/api/admin/getfaculty", department);

export const addSubject = (subject) =>
  API.post("/api/admin/addsubject", subject);
export const getSubject = (subject) =>
  API.post("/api/admin/getsubject", subject);

export const addStudent = (student) =>
  API.post("/api/admin/addstudent", student);

export const getStudent = (student) =>
  API.post("/api/admin/getstudent", student);
export const getNotice = (notice) => API.post("/api/admin/getnotice", notice);
export const deleteNotice = (id) => API.delete(`/api/notice/${id}`);

// Faculty

export const facultySignIn = (formData) =>
  API.post("/api/faculty/login", formData);

export const facultyUpdatePassword = (updatedPassword) =>
  API.post("/api/faculty/updatepassword", updatedPassword);

export const updateFaculty = (updatedFaculty) =>
  API.post("/api/faculty/updateprofile", updatedFaculty);

export const createTest = (test) => API.post("/api/faculty/createtest", test);
export const getTest = (test) => API.post("/api/faculty/gettest", test);
export const getMarksStudent = (student) =>
  API.post("/api/faculty/getstudent", student);
export const uploadMarks = (data) => API.post("/api/faculty/uploadmarks", data);
export const markAttendance = (data) =>
  API.post("/api/faculty/markattendance", data);

// Student

export const studentLogin = (formData) =>API.post("/api/student/login", formData);
export const studentUpdatePassword = (formData) => API.post("/api/student/updatepassword", formData);

export const updateStudent = (updatedStudent) =>
  API.post("/api/student/updateprofile", updatedStudent);
export const getTestResult = (testResult) =>
  API.post("/api/student/testresult", testResult);
export const getAttendance = (attendance) =>
  API.post("/api/student/attendance", attendance);

// Warden
export const wardenLogin = (formData) => API.post("/api/warden/login", formData);
export const wardenUpdatePassword = (updatedPassword) =>
  API.post("/api/warden/updatepassword", updatedPassword);
export const updateWarden = (updatedWarden) =>
  API.post("/api/warden/updateprofile", updatedWarden);

// Admin-Warden management
export const addWarden = (warden) => API.post("/api/admin/addwarden", warden);
export const getAllWarden = () => API.get("/api/admin/getallwarden");
export const deleteWarden = (data) => API.post("/api/admin/deletewarden", data);

// Hostel Leave
export const createLeave = (data) => API.post("/api/hostel/leave/create", data);
export const getStudentLeave = (data) => API.post("/api/hostel/leave/student", data);
export const getAdminPendingLeaves = () => API.get("/api/hostel/leave/admin");
export const hodApprove = (data) => API.post("/api/hostel/leave/hod-approve", data);
export const getFacultyPendingLeaves = (data) => API.post("/api/hostel/leave/faculty", data);
export const coordinatorApprove = (data) => API.post("/api/hostel/leave/coordinator-approve", data);
export const getWardenPendingLeaves = () => API.get("/api/hostel/leave/warden");
export const wardenApprove = (data) => API.post("/api/hostel/leave/warden-approve", data);
export const rejectLeave = (data) => API.post("/api/hostel/leave/reject", data);

// Warden Dashboard Data
export const getWardenApprovedLeaves = () => API.get("/api/hostel/leave/warden/approved");
export const getWardenActiveLeaves = () => API.get("/api/hostel/leave/active");
export const getWardenAttendance = () => API.get("/api/warden/attendance");

// Hostel Attendance
export const markHostelAttendance = (data) => API.post("/api/attendance/mark", data);
export const getStudentHostelAttendance = () => API.get("/api/attendance/student");
export const getAdminHostelAttendance = () => API.get("/api/attendance/admin");

// Notifications
export const getUserNotifications = () => API.get("/api/notification/user");
export const markNotificationAsRead = (id) => API.put(`/api/notification/read/${id}`);
export const markAllNotificationsAsRead = () => API.put("/api/notification/read-all");
