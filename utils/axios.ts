/**
 * axios setup to use mock service
 */

import axios from "axios";

const defaultUrl = "http://137.184.125.119:8080";
const token = localStorage.getItem('yendz_token')

const axiosServices = axios.create(
  {
    baseURL: defaultUrl,
    headers : {      
        Accept: 'application/json',
        //Authorization: 'Bearer ' + token 
    }
 }        
);

const yendzApi = axios.create(
  {
    baseURL: defaultUrl,
    headers : {      
        Accept: 'application/json',
        Authorization: 'Bearer ' + token 
    }
 }        
);

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Wrong Services")
);

export default axiosServices;
