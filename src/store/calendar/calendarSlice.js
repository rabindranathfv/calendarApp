import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const tempEvent = {
  _id: new Date().getTime(),
  title: 'Evento de prueba',
  notes: 'NOTES: Recordatorio de prueba',
  start: new Date(),
  end: addHours( new Date(), 2),
  bgcolor: 'FAFAFA',
  user: {
    _id: 123,
    name: 'Rabindranath'
  }
}

const initialState = {
  events: [tempEvent],
  activeEvent: null,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, {payload}) => {
      state.activeEvent = payload;
    }
  },
})

export const { onSetActiveEvent } = calendarSlice.actions

export default calendarSlice.reducer