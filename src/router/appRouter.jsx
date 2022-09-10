import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/loginPage";
import { CalendarPage } from './../calendar/pages/calendarPage';

export const AppRouter = () => {

  const authStatus = 'not-authenticated'; // 'authenticated'

  return (
    <Routes>
      { authStatus === 'not-authenticated'
        ? <Route path='/auth/*' element={<LoginPage />} />
        : <Route path='/*' element={<CalendarPage />} />
      }

      <Route path='/*' element={ <Navigate to='/auth/login' /> }/>
    </Routes>
  )
}
