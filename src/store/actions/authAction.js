export const setToken = (data) => {
    return {
        type: 'SET_TOKEN',
        payload: data,
    };
}

export const removeToken = () => {
    return {
        type: 'REMOVE_TOKEN',
        payload: null,
    };
}