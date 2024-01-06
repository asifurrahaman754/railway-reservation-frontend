import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./features/api/apiSlice";
import authReducer from "./features/auth/authSlice";
import ticketReducer from "./features/ticket/ticketSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    ticket: ticketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
