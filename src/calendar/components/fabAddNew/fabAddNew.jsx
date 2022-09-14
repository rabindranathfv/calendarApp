
import { useUiStore } from './../../../hooks/useUiStore';
import { useCalendarStore } from './../../../hooks/useCalendarStore';

import { addHours } from 'date-fns';

export const FabAddNew = () => {
  const {openDateModal} = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleNewEvent = (event) => {
    openDateModal();
    setActiveEvent({ title: '',
    notes: '',
    start: new Date(),
    end: addHours( new Date(), 2),
    bgcolor: 'FAFAFA',
    user: {
      id: 123,
      name: 'Rabindranath'
    } })
  }

  return (
    <>
      <button className="btn btn-primary fab"
        onClick={handleNewEvent}>
        <i className="fas fa-solid fa-plus"></i>
      </button>
    </>
  )
}
