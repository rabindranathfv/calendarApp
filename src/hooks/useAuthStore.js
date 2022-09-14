
import { useSelector, useDispatch } from 'react-redux';
import { onChecking, onLogin, onLogout, onClearError } from '../store/auth/auth';
import calendarApi from './../api/calendarAPI';

export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector( state => state.auth);
  const dispatch = useDispatch();

  const startLogin = async( {email, password }) => {
    dispatch(onChecking())
    try {
      const { data } = await calendarApi.post('/auth', { email, password })
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin( { name: data.name, uid: data.uid }))

    } catch (error) {
      console.log(error);
      dispatch(onLogout('wrong credentials'))
      setTimeout(() => {
        dispatch(onClearError())
      }, 2000);
    }

  }

  const startRegister = async({ name, email, password} ) => {
    dispatch(onChecking())
    try {
      const { data } = await calendarApi.post('/auth/register', { name , email , password })
      console.log("🚀 ~ file: useAuthStore.js ~ line 33 ~ startRegister ~ resp", data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin( { name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      dispatch(onLogout(error.response.data?.msg ))
      setTimeout(() => {
        dispatch(onClearError())
      }, 2000);
    }
  }

  const checkAuthToken = async() => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout())

    try {
      const { data } = calendarApi.get('/auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin( { name: data.name, uid: data.uid }));

    } catch (error) {
      localStorage.clear();
      dispatch(onLogout())
    }
  }

  return {
    status,
    user,
    errorMessage,

    startLogin,
    startRegister,
    checkAuthToken
  }
}
