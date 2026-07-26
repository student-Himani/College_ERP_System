import {
  GET_LEAVES,
  CREATE_LEAVE,
  APPROVE_LEAVE,
  REJECT_LEAVE,
  SET_ERRORS,
} from "../actionTypes";
import * as api from "../api";

export const getStudentLeave = (studentId) => async (dispatch) => {
  try {
    const { data } = await api.getStudentLeave({ studentId });
    dispatch({ type: GET_LEAVES, payload: data.result });
  } catch (error) {
    console.log(error);
  }
};

export const createLeave = (leaveData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createLeave(leaveData);
    dispatch({ type: CREATE_LEAVE, payload: data.response });
    alert("Leave Requested Successfully");
    // Optionally fetch leaves again
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAdminPendingLeaves = () => async (dispatch) => {
  try {
    const { data } = await api.getAdminPendingLeaves();
    dispatch({ type: GET_LEAVES, payload: data.result });
  } catch (error) {
    console.log(error);
  }
};

export const hodApprove = (leaveId, adminId) => async (dispatch) => {
  try {
    const { data } = await api.hodApprove({ leaveId, adminId });
    dispatch({ type: APPROVE_LEAVE, payload: data.response });
  } catch (error) {
    console.log(error);
  }
};

export const getFacultyPendingLeaves = (department) => async (dispatch) => {
  try {
    const { data } = await api.getFacultyPendingLeaves({ department });
    dispatch({ type: GET_LEAVES, payload: data.result });
  } catch (error) {
    console.log(error);
  }
};

export const coordinatorApprove = (leaveId, facultyId) => async (dispatch) => {
  try {
    const { data } = await api.coordinatorApprove({ leaveId, facultyId });
    dispatch({ type: APPROVE_LEAVE, payload: data.response });
  } catch (error) {
    console.log(error);
  }
};

export const getWardenPendingLeaves = () => async (dispatch) => {
  try {
    const { data } = await api.getWardenPendingLeaves();
    dispatch({ type: GET_LEAVES, payload: data.result });
  } catch (error) {
    console.log(error);
  }
};

export const wardenApprove = (leaveId, wardenId) => async (dispatch) => {
  try {
    const { data } = await api.wardenApprove({ leaveId, wardenId });
    dispatch({ type: APPROVE_LEAVE, payload: data.response });
  } catch (error) {
    console.log(error);
  }
};

export const rejectLeave = (leaveId) => async (dispatch) => {
  try {
    const { data } = await api.rejectLeave({ leaveId });
    dispatch({ type: REJECT_LEAVE, payload: data.response });
  } catch (error) {
    console.log(error);
  }
};
