import { SET_LOADING, REMOVE_LOADING } from "../types/actionType";

export const setLoading = () => ({
    type: SET_LOADING,
    payload: null
});

export const removeLoading = () => ({
    type: REMOVE_LOADING,
    payload: null
})