/**
 * axios setup to use mock service
 */

import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {

  const defaultUrl = "http://137.184.125.119:8080";
  const token = localStorage.getItem('yendz_token')

  const axiosAuth = axios.create(
    {
      baseURL: defaultUrl,
      headers : {      
        Accept: 'application/json'
      }
  }        
  );

  // interceptor for http
  axiosAuth.interceptors.response.use(
    (response) => response,
    (error) =>
      Promise.reject((error.response && error.response.data) || "Wrong S)
  );

  return {
    provide: {
      axiosAuth: axiosAuth,
    },
  };
});
