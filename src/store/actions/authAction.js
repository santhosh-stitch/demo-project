import { REMOVE_TOKEN, SET_TOKEN } from "../types/actionType";

export const setToken = (data) => ({
    type: SET_TOKEN,
    payload: data,
});

export const removeToken = () => ({
    type: REMOVE_TOKEN,
    payload: null,
});