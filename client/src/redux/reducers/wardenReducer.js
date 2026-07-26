import { WARDEN_LOGIN, UPDATE_PASSWORD, UPDATE_WARDEN } from "../actionTypes";

const initialState = {
  authData: null,
  updatePassword: null,
  updateWarden: null,
  approvedLeaves: [],
  activeLeaves: [],
  attendanceRecords: [],
};

const wardenReducer = (state = initialState, action) => {
  switch (action.type) {
    case WARDEN_LOGIN: {
      const payload = action.data || action.payload || {};
      const warden = payload.result || payload.warden || null;
      const token = payload.token || null;
      const userToStore = { ...payload, token, warden };
      localStorage.setItem("user", JSON.stringify(userToStore));
      return { ...state, authData: payload };
    }
    case UPDATE_PASSWORD:
      return { ...state, updatePassword: action?.payload };
    case UPDATE_WARDEN:
      return { ...state, updateWarden: action?.payload };
    case "GET_WARDEN_APPROVED_LEAVES":
      return { ...state, approvedLeaves: action.payload };
    case "GET_WARDEN_ACTIVE_LEAVES":
      return { ...state, activeLeaves: action.payload };
    case "GET_WARDEN_ATTENDANCE":
      return { ...state, attendanceRecords: action.payload };
    default:
      return state;
  }
};

export default wardenReducer;
