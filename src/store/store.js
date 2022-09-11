import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import uiSlice from './ui/uiSlice';
import calendarSlice from './calendar/calendarSlice';

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    ui: uiSlice,
    calendar: calendarSlice
  },
})
