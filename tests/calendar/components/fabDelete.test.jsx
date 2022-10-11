/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import { FabDelete } from "../../../src/calendar/components/fabDelete/fabDelete"
import { store } from './../../../src/store/store';

jest.mock('./../../../src/hooks/useCalendarStore')

describe('Unit test for fabDelete component', () => {
  // TODO: FIX LATER
  it.skip('should be create fabDelete Component after renderer first time', () => {
    console.log('HERE*****');
    render(<Provider store={store}> <FabDelete /> </Provider>)
    screen.debug();
  })
})