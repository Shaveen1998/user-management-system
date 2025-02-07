import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { combineReducers } from "redux";
import authReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "admin"],
};

const rootReducer = combineReducers({
  users: userReducer,
  auth: persistReducer(persistConfig, authReducer),
});

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };
