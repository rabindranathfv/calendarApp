import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours, getDay, parse, format, startOfWeek } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
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

export const CalendarPage = () => {
  return (
    <>
      <Navbar />
      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px )' }}
    />
    </>
  )
}
