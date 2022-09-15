import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/appRouter";
import { Provider } from 'react-redux';
import { store } from './store/store';

const CalendarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
    </Provider>
  )
}

export default CalendarApp;