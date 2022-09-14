import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth/pages/loginPage";
import { CalendarPage } from './../calendar/pages/calendarPage';
import { useAuthStore } from './../hooks/useAuthStore';

export const AppRouter = () => {

  const authStatus = 'not-authenticated';// 'authenticated'
  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken();
  }, [])


  if ( status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
      { status === 'not-authenticated'
        ? <Route path='/auth/*' element={<LoginPage />} />
        : <Route path='/*' element={<CalendarPage />} />
      }

      <Route path='/*' element={ <Navigate to='/auth/login' /> }/>
    </Routes>
  )
}
