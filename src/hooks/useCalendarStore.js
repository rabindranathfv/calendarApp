import { useDispatch, useSelector } from 'react-redux';

export const useCalendarStore = () => {

  const { events, activeEvent } = useSelector( state => state.calendar);
  const dispatch = useDispatch();

  return {
    events,
    activeEvent
  }
}
