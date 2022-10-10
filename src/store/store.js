import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import uiSlice from "./ui/uiSlice";
import calendarSlice from "./calendar/calendarSlice";
import authSlice from "./auth/auth";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
    auth: authSlice.reducer,
  },
});
