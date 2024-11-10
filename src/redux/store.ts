import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import roomReducer from "./roomSlice";
import thunk from "redux-thunk";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
