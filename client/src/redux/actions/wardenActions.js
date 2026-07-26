import {
  SET_ERRORS,
  WARDEN_LOGIN,
  UPDATE_PASSWORD,
  UPDATE_WARDEN,
} from "../actionTypes";
import * as api from "../api";

export const wardenLogin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.wardenLogin(formData);
    dispatch({ type: WARDEN_LOGIN, data });
    navigate("/warden-dashboard");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const wardenUpdatePassword =
  (formData, navigate) => async (dispatch) => {
    try {
      await api.wardenUpdatePassword(formData);
      dispatch({ type: UPDATE_PASSWORD, payload: true });
      alert("Password Updated");
      navigate("/warden/home");
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const updateWarden = (formData) => async (dispatch) => {
  try {
    await api.updateWarden(formData);
    dispatch({ type: UPDATE_WARDEN, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getWardenApprovedLeaves = () => async (dispatch) => {
  try {
    const { data } = await api.getWardenApprovedLeaves();
    dispatch({ type: "GET_WARDEN_APPROVED_LEAVES", payload: data.result });
  } catch (error) {
    console.log(error);
  }
};

export const getWardenActiveLeaves = () => async (dispatch) => {
  try {
    const { data } = await api.getWardenActiveLeaves();
    dispatch({ type: "GET_WARDEN_ACTIVE_LEAVES", payload: data.result });
  } catch (error) {
    console.log(error);
  }
};

export const getWardenAttendance = () => async (dispatch) => {
  try {
    const { data } = await api.getWardenAttendance();
    dispatch({ type: "GET_WARDEN_ATTENDANCE", payload: data.result });
  } catch (error) {
    console.log(error);
  }
};
