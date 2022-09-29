import { REMOVE_USER, SET_USER } from "../types/actionType";

export const setUser = (data) => ({ type: SET_USER, payload: data });

export const removeUser = () => ({ type: REMOVE_USER, payload: null });
