import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar);

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async( calendarEvent ) => {
    // TODO: ENVIAR DATA AL BACK

    if (calendarEvent._id) {
      dispatch( onUpdateEvent({...calendarEvent}))
    } else {
      dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
    }
  }

  const startDeleteEvent = () => {
    dispatch( onDeleteEvent());
  }
  return {
    events,
    activeEvent,
    hasEventSelect: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent
  }
}
