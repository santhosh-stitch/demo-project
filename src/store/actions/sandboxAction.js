import { REMOVE_SANDBOX, SET_SANDBOX } from "../types/actionType";

export const setSandbox = (data) => ({ type: SET_SANDBOX, payload: data });

export const removeSandbox = () => ({ type: REMOVE_SANDBOX, payload: null });
