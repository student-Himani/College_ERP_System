// src/redux/actions/studentActions.js
import * as api from "../api";
import { 
  STUDENT_LOGIN, 
  UPDATE_PASSWORD, 
  SET_ERRORS,
  GET_SUBJECT,
  TEST_RESULT,
  ATTENDANCE,
  UPDATE_STUDENT
} from "../constants/studentConstants";



export const studentSignIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.studentLogin(formData);

    const rawStudent = data?.result || data?.student || {};
    const token = data?.token || null;

    const minimalStudent = {
      _id: rawStudent._id,
      name: rawStudent.name,
      email: rawStudent.email,
      department: rawStudent.department,
      year: rawStudent.year,
      section: rawStudent.section,
    };

    // Remove any previous large payload
    localStorage.removeItem("user");

    // Store only minimal, role-specific data
    const userToStore = {
      token,
      student: minimalStudent,
      // keep `result` for legacy code that expects user.result.*
      result: minimalStudent,
    };

    localStorage.setItem("user", JSON.stringify(userToStore));

    // Update redux state with minimal payload
    dispatch({
      type: STUDENT_LOGIN,
      payload: {
        token,
        student: minimalStudent,
      },
    });

    navigate("/student/home");
  } catch (error) {
    console.log("Login error:", error);

    dispatch({
      type: SET_ERRORS,
      payload: error.response?.data || { message: error.message },
    });
  }
};
// Update password
export const studentUpdatePassword = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.studentUpdatePassword(formData);
    dispatch({ type: UPDATE_PASSWORD, payload: data });
    alert("Password Updated");
    navigate("/student/home");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response?.data || { message: error.message },
    });
  }
};

// Update student profile
export const updateStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateStudent(formData);
    dispatch({ type: UPDATE_STUDENT, payload: data });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response?.data || { message: error.message },
    });
  }
};

// Get subjects
export const getSubject = (department, year) => async (dispatch) => {
  try {
    const { data } = await api.getSubject({ department, year });
    dispatch({ type: GET_SUBJECT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response?.data || { message: error.message } });
  }
};

// Get test result
export const getTestResult = (department, year, section) => async (dispatch) => {
  try {
    const { data } = await api.getTestResult({ department, year, section });
    dispatch({ type: TEST_RESULT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response?.data || { message: error.message } });
  }
};

// Get attendance
export const getAttendance = (department, year, section) => async (dispatch) => {
  try {
    const { data } = await api.getAttendance({ department, year, section });
    dispatch({ type: ATTENDANCE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response?.data || { message: error.message } });
  }
};