import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const tempEvent = {
  title: 'Evento de prueba',
  notes: 'Recordatorio de prueba',
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
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    }
  },
})

export const { onOpenDateModal, onCloseDateModal } = calendarSlice.actions

export default calendarSlice.reducer