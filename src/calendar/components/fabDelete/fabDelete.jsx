import { useDispatch } from 'react-redux';
import { onDeleteEvent } from '../../../store/calendar/calendarSlice';
import { useCalendarStore } from './../../../hooks/useCalendarStore';

export const FabDelete = () => {
  const { startDeleteEvent } = useCalendarStore();

  return (
    <>
      <button className="btn btn-danger fab-danger"
        onClick={startDeleteEvent}>
        <i className="fas fa-trash-alt"></i>
      </button>
    </>
  )
}
