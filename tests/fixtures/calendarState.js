export const events = [
  {
    id: 1,
    title: "Evento de prueba",
    notes: "NOTES: Recordatorio de prueba",
    start: new Date("2022-10-15 13:00:00"),
    end: new Date("2022-10-15 15:00:00"),
    bgcolor: "FAFAFA",
  },
  {
    id: 2,
    title: "Evento de prueba 2",
    notes: "NOTES: Recordatorio de prueba 2",
    start: new Date("2022-10-16 13:00:00"),
    end: new Date("2022-10-16 15:00:00"),
    bgcolor: "FAFAFA",
  },
];

export const calendarStateWithEvents = {
  isloadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarStateWithActiveEvents = {
  isloadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
