/** @jest-environment jsdom */
import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/fabDelete/fabDelete"
import { useCalendarStore } from './../../../src/hooks/useCalendarStore';

jest.mock('./../../../src/hooks/useCalendarStore');

describe('Unit test for fabDelete component', () => {

  const mockStartDeleteEvent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should be create fabDelete Component after renderer first time', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelect: false
    });
    render( <FabDelete />)
    const btnDelete = screen.getByLabelText('btn-delete');

    expect( btnDelete ).toBeDefined();
    expect( btnDelete.classList ).toContain('btn');
    expect( btnDelete.classList ).toContain('btn-danger');
    expect( btnDelete.classList ).toContain('fab-danger');
    expect( btnDelete.style.display ).toBe('none');
  })

  it('should be create fabDelete and execute onClick event startDeleteEvent', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelect: true,
      startDeleteEvent: mockStartDeleteEvent
    });
    render( <FabDelete />)
    const btnDelete = screen.getByLabelText('btn-delete');
    fireEvent.click( btnDelete );

    expect( btnDelete ).toBeDefined();
    expect( btnDelete.style.display).toBe('');
    expect( mockStartDeleteEvent ).toHaveBeenCalled();
  })
})