import { SET_TOKEN, REMOVE_TOKEN } from "../types/actionType";

const authReducer = (state = null, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {...state, token: action.payload };
        case REMOVE_TOKEN:
            return null;
        default:
            return state;
    }
};

export default authReducer;