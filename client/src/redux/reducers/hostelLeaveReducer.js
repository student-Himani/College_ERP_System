import {
  GET_LEAVES,
  CREATE_LEAVE,
  APPROVE_LEAVE,
  REJECT_LEAVE,
} from "../actionTypes";

const initialState = {
  leaves: [],
};

const hostelLeaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEAVES:
      return {
        ...state,
        leaves: action.payload,
      };
    case CREATE_LEAVE:
      return {
        ...state,
        leaves: [action.payload, ...state.leaves],
      };
    case APPROVE_LEAVE:
    case REJECT_LEAVE:
      return {
        ...state,
        leaves: state.leaves.map((leave) =>
          leave._id === action.payload._id ? action.payload : leave
        ),
      };
    default:
      return state;
  }
};

export default hostelLeaveReducer;
