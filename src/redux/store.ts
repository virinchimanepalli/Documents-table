// Converting Redux to the toolkit version
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import accountReducer from "./slices/account";
import documentReducer from "./slices/document";
import storage from "redux-persist/lib/storage";
import { documentSlice } from "./slices/document";
const reducers = combineReducers({
  // account: accountReducer,
  account: accountReducer,
  document: documentReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
