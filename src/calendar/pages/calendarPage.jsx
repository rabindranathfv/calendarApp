import { useState   } from 'react';
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

import { Navbar } from '../components/navbar/navbar';
import { getMessagesEs } from '../../helpers/getMessages';
import { CalendarEventBox } from '../components/calendarEventBox/calendarEventBox';
import { CalendarModal } from '../components/calendarModal/calendarModal';
import { FabAddNew } from './../components/fabAddNew/fabAddNew';

export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected })
    const style = {
      backgroundColor: '#347cf7',
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
    console.log("🚀 ~ file: calendarPage.jsx ~ line 52 ~ onSelect ~ event", event)
    setActiveEvent(event);
  }

  const onChangeEvent = (event) => {
    localStorage.setItem('lastView', event);
    setlastView(event);
  }

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
    </>
  )
}
