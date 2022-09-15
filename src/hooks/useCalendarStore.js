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

  const startDeleteEvent = async() => {
    try {
      const { id, title } = activeEvent;
      const ModalDelete = await Swal.fire({
        title: '<strong>Eliminar Evento</strong>',
        icon: 'info',
        html:
          `Desea eliminar el evento <b>${title}?</b>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Si!',
        confirmButtonAriaLabel: 'Thumbs up, No!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
      });

      if ( ModalDelete.isConfirmed) {
        const { data } = await calendarApi.delete(`/events/${id}`);
        Swal.fire('Evento Eliminado exitosamente', data.msg , 'success');
        dispatch( onDeleteEvent());
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar un evento', error.response.data.msg , 'error');
    }
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
