import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/appRouter";

export const CalendarApp = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
