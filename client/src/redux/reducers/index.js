import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import errorReducer from "./errorReducer";
import facultyReducer from "./facultyReducer";
import studentReducer from "./studentReducer";
import wardenReducer from "./wardenReducer";
import hostelLeaveReducer from "./hostelLeaveReducer";

export default combineReducers({
  admin: adminReducer,
  errors: errorReducer,
  faculty: facultyReducer,
  student: studentReducer,
  warden: wardenReducer,
  hostelLeave: hostelLeaveReducer,
});
