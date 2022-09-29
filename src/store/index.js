import {  combineReducers, configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer, loadingReducer } from "./reducers";

const persistConfig = {
    key: "stitch_console_v1",
    whitelist: ["auth"],
    version: 1,
    storage: storage,
};

 const reducer = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
});

// const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({reducer});

// export const persistor = persistStore(store);
export default store;