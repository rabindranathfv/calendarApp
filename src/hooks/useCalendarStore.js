import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import calendarApi from './../api/calendarAPI';
import { convertEventsToDateEvents } from './../helpers/convertEventToDateEvents';

import Swal from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar);
  const { user } = useSelector( state => state.auth);

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async( calendarEvent ) => {
    try {
      // TODO: Update Event
      if (calendarEvent.id) {
        const { data } = await calendarApi.put(`/events/${calendarEvent.id}`, { ...calendarEvent, user });
        dispatch( onUpdateEvent({...calendarEvent, user}));
      } else {
        const { data } = await calendarApi.post('/events', { ...calendarEvent });
        dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar o actualizar un evento', error.response.data.msg , 'error');
    }
  }

  const startDeleteEvent = () => {
    dispatch( onDeleteEvent());
  }

  const startLoadingEvent = async() => {
    try {
      const { data } = await calendarApi.get('/events/');
      const eventsMapped = convertEventsToDateEvents(data.events);
      dispatch( onLoadEvents(eventsMapped) );
    } catch (error) {
      console.log(error);
    }
  }

  return {
    events,
    activeEvent,
    hasEventSelect: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvent
  }
}
