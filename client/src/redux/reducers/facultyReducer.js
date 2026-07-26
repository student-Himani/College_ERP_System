import {
  ADD_TEST,
  ATTENDANCE_MARKED,
  FACULTY_LOGIN,
  GET_TEST,
  LOGOUT,
  MARKS_UPLOADED,
  UPDATE_FACULTY,
  UPDATE_PASSWORD,
} from "../actionTypes";

const initialState = {
  token: null,
  faculty: null,
  updatedPassword: false,
  updatedFaculty: false,
  testAdded: false,
  marksUploaded: false,
  attendanceUploaded: false,
  tests: [],
};

const facultyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FACULTY_LOGIN: {
      const token = action.payload?.token || null;
      const faculty = action.payload?.faculty || null;

      return {
        ...state,
        token,
        faculty,
      };
    }
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        token: null,
        faculty: null,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        updatedPassword: action.payload,
      };
    case UPDATE_FACULTY:
      return {
        ...state,
        updatedFaculty: action.payload,
      };
    case ADD_TEST:
      return {
        ...state,
        testAdded: action.payload,
      };
    case GET_TEST:
      return {
        ...state,
        tests: action.payload,
      };
    case MARKS_UPLOADED:
      return {
        ...state,
        marksUploaded: action.payload,
      };
    case ATTENDANCE_MARKED:
      return {
        ...state,
        attendanceUploaded: action.payload,
      };

    default:
      return state;
  }
};

export default facultyReducer;
