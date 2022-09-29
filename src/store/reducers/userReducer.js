import { REMOVE_USER, SET_USER } from "../utils/actionTypes";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return null;
    default:
      return state;
  }
};

export default userReducer;
