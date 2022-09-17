import axios from 'axios';
import { getEnvVariables } from './../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();
console.log("🚀 ~ file: calendarAPI.js ~ line 6 ~ VITE_API_URL", VITE_API_URL)

const calendarApi = axios.create({
  baseURL: (VITE_API_URL || process.env.VITE_API_URL) || 'http://localhost:4000/api/v1'
})

// TODO: configure interceptors
calendarApi.interceptors.request.use( config => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
  }

  return config;
})

export default calendarApi;