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
    },
    onAddNewEvent: (state, {payload}) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, {payload}) => {
      state.events = state.events.map( e => {
        if (e._id === payload._id) {
          return payload
        };
        return e;
      })
    },
    onDeleteEvent: (state) => {
      if ( state.activeEvent ) {
        state.events = state.events.filter( e => {
          return e._id !== state.activeEvent._id;
        })
        state.activeEvent = null;
      }
    }
  },
})

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions

export default calendarSlice.reducer