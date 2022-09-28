import { SET_LOADING, REMOVE_lOADING } from "../types/actionType";

export const setLoading = () => ({
    type: SET_LOADING,
    payload: null
});

export const removeLoading = () => ({
    type: REMOVE_lOADING,
    payload: null
})