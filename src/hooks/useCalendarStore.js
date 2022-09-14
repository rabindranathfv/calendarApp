import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import calendarApi from './../api/calendarAPI';
import { convertEventsToDateEvents } from './../helpers/convertEventToDateEvents';

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
        dispatch( onUpdateEvent({...calendarEvent}))
      } else {
        const { data } = await calendarApi.post('/events', { ...calendarEvent })
        dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) )
      }
    } catch (error) {
      console.log(error);
    }
  }

  const startDeleteEvent = () => {
    dispatch( onDeleteEvent());
  }

  const startLoadingEvent = async() => {
    try {
      const { data } = await calendarApi.get('/events/');
      const eventsMapped = convertEventsToDateEvents(data.events);
      console.log("🚀 ~ file: useCalendarStore.js ~ line 39 ~ startLoadingEvent ~ eventsMapped", eventsMapped)
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
