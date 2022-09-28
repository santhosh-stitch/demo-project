import { applyMiddleware, combineReducers, configureStore } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer, loadingReducer } from "./reducers";

const persistConfig = {
    key: "stitch_console_v1",
    whitelist: ["auth"],
    version: 1,
    storage: storage,
};

const reducers = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
export default store;