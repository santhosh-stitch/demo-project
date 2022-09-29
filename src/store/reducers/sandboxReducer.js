import { REMOVE_SANDBOX, SET_SANDBOX } from "../utils/actionTypes";

const sandboxReducer = (state = null, action) => {
  switch (action.type) {
    case SET_SANDBOX:
      return { ...state, sandbox: action.payload };
    case REMOVE_SANDBOX:
      return null;
    default:
      return state;
  }
};

export default sandboxReducer;
