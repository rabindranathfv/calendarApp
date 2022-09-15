import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { getDay, parse, format, startOfWeek } from 'date-fns';
import esES from 'date-fns/locale/es';

const locales = {
  'es': esES
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

import { useUiStore, useCalendarStore } from './../../hooks';
import { useAuthStore } from './../../hooks/useAuthStore';

import { Navbar } from '../components/navbar/navbar';
import { CalendarEventBox } from '../components/calendarEventBox/calendarEventBox';
import { CalendarModal } from '../components/calendarModal/calendarModal';
import { FabAddNew } from './../components/fabAddNew/fabAddNew';
import { FabDelete } from './../components/fabDelete/fabDelete';

import { getMessagesEs } from '../../helpers/getMessages';

export const CalendarPage = () => {

  const { openDateModal, isDateModalOpen } = useUiStore();
  const { events, hasEventSelect, setActiveEvent, startLoadingEvent } = useCalendarStore();
  const { user } = useAuthStore();
  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = user.uid === event.user._id || user.uid === event.user.uid;
    const style = {
      backgroundColor: isMyEvent ? '#347cf7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onChangeEvent = (event) => {
    localStorage.setItem('lastView', event);
    setlastView(event);
  }

  useEffect(() => {
    startLoadingEvent();
  }, [])

  return (
    <>
      <Navbar />
      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      startAccessor='start'
      endAccessor='end'
      defaultView={lastView}
      style={{ height: 'calc( 100vh - 80px )' }}
      messages={getMessagesEs()}
      eventPropGetter={ eventStyleGetter }
      components={{
        event: CalendarEventBox
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onChangeEvent}
    />

    <CalendarModal />

    <FabAddNew />
    { hasEventSelect && !isDateModalOpen && <FabDelete />}
    </>
  )
}
