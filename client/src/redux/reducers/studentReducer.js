// import { 
//   STUDENT_LOGIN, 
//   UPDATE_PASSWORD, 
//   SET_ERRORS,
//   GET_SUBJECT,
//   TEST_RESULT,
//   ATTENDANCE,
//   UPDATE_STUDENT
// } from "../constants/studentConstants";

// const initialState = {
//   student: null,
//   token: null,
//   updatedPassword: false,
//   updatedStudent: false,
//   testResult: [],
//   attendance: [],
//   subjects: [],
//   error: null,
// };

// const studentReducer = (state = initialState, action) => {
//   switch (action.type) {

//     case STUDENT_LOGIN: {
//       const studentData = {
//         token: action.payload.token,
//         student: action.payload.student
//       };

//       // ✅ store only minimal data
//       localStorage.setItem("user", JSON.stringify(studentData));

//       return {
//         ...state,
//         student: action.payload.student,
//         token: action.payload.token,
//         error: null
//       };
//     }

//     case SET_ERRORS:
//       return { ...state, error: action.payload };

//     case UPDATE_PASSWORD:
//       return { ...state, updatedPassword: action.payload };

//     case UPDATE_STUDENT:
//       return { ...state, updatedStudent: action.payload };

//     case TEST_RESULT:
//       return { ...state, testResult: action.payload };

//     case ATTENDANCE:
//       return { ...state, attendance: action.payload };

//     case GET_SUBJECT:
//       return { ...state, subjects: action.payload };

//     default:
//       return state;
//   }
// };

// export default studentReducer;

import { 
  STUDENT_LOGIN, 
  UPDATE_PASSWORD, 
  SET_ERRORS,
  GET_SUBJECT,
  TEST_RESULT,
  ATTENDANCE,
  UPDATE_STUDENT
} from "../constants/studentConstants";

const initialState = {
  student: null,
  token: null,
  updatedPassword: false,
  updatedStudent: false,
  testResult: [],
  attendance: [],
  subjects: [],
  error: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {

    case STUDENT_LOGIN: {
      const token = action.payload?.token || null;
      const studentData = action.payload?.student || null;

      return {
        ...state,
        student: studentData,
        token,
        error: null,
      };
    }

    case SET_ERRORS:
      return { ...state, error: action.payload };

    case UPDATE_PASSWORD:
      return { ...state, updatedPassword: action.payload };

    case UPDATE_STUDENT:
      return { ...state, updatedStudent: action.payload };

    case TEST_RESULT:
      return { ...state, testResult: action.payload };

    case ATTENDANCE:
      return { ...state, attendance: action.payload };

    case GET_SUBJECT:
      return { ...state, subjects: action.payload };

    default:
      return state;
  }
};

export default studentReducer;