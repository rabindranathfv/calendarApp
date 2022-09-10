import { useState   } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours, getDay, parse, format, startOfWeek } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import esES from 'date-fns/locale/es';

const locales = {
  // 'en-US': enUS,
  'es': esES
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [{
  title: 'Evento de prueba',
  notes: 'Recordatorio de prueba',
  start: new Date(),
  end: addHours( new Date(), 2),
  bgcolor: 'FAFAFA'
}]

import { Navbar } from "../components/navbar/navbar";
import { getMessagesEs } from '../../helpers/getMessages';
import { CalendarEventBox } from '../components/calendarEventBox/calendarEventBox';
import { CalendarModal } from '../components/calendarModal/calendarModal';

export const CalendarPage = () => {

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

  }

  const onSelect = (event) => {

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
      startAccessor="start"
      endAccessor="end"
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
    </>
  )
}
