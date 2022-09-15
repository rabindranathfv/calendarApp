import { createSlice } from '@reduxjs/toolkit'
// import { addHours } from 'date-fns';

// const tempEvent = {
//   id: new Date().getTime(),
//   title: 'Evento de prueba',
//   notes: 'NOTES: Recordatorio de prueba',
//   start: new Date(),
//   end: addHours( new Date(), 2),
//   bgcolor: 'FAFAFA',
//   user: {
//     id: 123,
//     name: 'Rabindranath'
//   }
// }

const initialState = {
  isloadingEvents: true,
  events: [],
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
        if (e.id === payload.id) {
          return payload
        };
        return e;
      })
    },
    onDeleteEvent: (state) => {
      if ( state.activeEvent ) {
        state.events = state.events.filter( e => {
          return e.id !== state.activeEvent.id;
        })
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = []}) => {
      state.isloadingEvents = false;
      payload.forEach(event => {
        const exists = state.events.some( e => e.id === event.id);
        if( !exists) {
          state.events.push(event);
        }
      });
    }
  },
})

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } = calendarSlice.actions

export default calendarSlice.reducer