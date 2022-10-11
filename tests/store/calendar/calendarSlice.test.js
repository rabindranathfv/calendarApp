import calendarSlice, {
  onAddNewEvent,
  onClearCalendar,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import { calendarStateWithEvents } from "../../fixtures/calendarState";
import { initialStateCalendar } from "./../../../src/store/calendar/calendarSlice";
import {
  events,
  calendarStateWithActiveEvents,
} from "./../../fixtures/calendarState";

describe("Unit test for Calendar Slice", () => {
  let state;

  beforeEach(() => {
    state = calendarSlice.getInitialState();
  });

  it("should load initial state for calendar", () => {
    expect(state).toEqual(initialStateCalendar);
  });

  it("should be trigger onClearCalendar", () => {
    state = calendarSlice.reducer(calendarStateWithEvents, onClearCalendar());
    expect(state).toEqual(initialStateCalendar);
  });

  it("should be trigger onSetActiveEvent", () => {
    state = calendarSlice.reducer(
      calendarStateWithEvents,
      onSetActiveEvent(events[0])
    );
    expect(state).toEqual(calendarStateWithActiveEvents);
  });

  it("should be trigger onDeleteEvent", () => {
    state = calendarSlice.reducer(
      calendarStateWithActiveEvents,
      onDeleteEvent()
    );
    expect(state.activeEvent).toBeFalsy();
    expect(state.events.length).toBe(1);
  });

  it("should be trigger onUpdateEvent", () => {
    const custmonTestEvent = {
      id: 1,
      title: "event UPDATED FOR REAL",
      notes: "NOTES: Recordatorio de prueba",
      start: new Date("2022-10-15 13:00:00"),
      end: new Date("2022-10-15 15:00:00"),
      bgcolor: "FAFAFA",
    };
    state = calendarSlice.reducer(
      calendarStateWithActiveEvents,
      onUpdateEvent(custmonTestEvent)
    );
    expect(state.events.length).toBe(events.length);
    expect(state.events[0]).toEqual(custmonTestEvent);
  });

  it("should be trigger onAddNewEvent", () => {
    const custmonTestEvent = {
      id: 3,
      title: "event 3",
      notes: "NOTES: Recordatorio de prueba",
      start: new Date("2022-10-17 13:00:00"),
      end: new Date("2022-10-17 15:00:00"),
      bgcolor: "FAFAFA",
    };
    state = calendarSlice.reducer(
      calendarStateWithActiveEvents,
      onAddNewEvent(custmonTestEvent)
    );
    expect(state.events.length).toBe(events.length + 1);
    expect(state.events[2]).toEqual(custmonTestEvent);
  });

  it("should be trigger onLoadEvents", () => {
    state = calendarSlice.reducer(state, onLoadEvents(events));
    expect(state).toEqual(calendarStateWithEvents);
  });
});
