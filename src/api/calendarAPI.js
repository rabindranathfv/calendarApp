import axios from 'axios';
import { getEnvVariables } from './../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL
})

// TODO: configure interceptors
calendarApi.interceptors.request.use( config => {
  console.log("TOKEN IN THE INTERCEPTOR", localStorage.getItem('token'));
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
  }

  return config;
})

export default calendarApi;