import axios from 'axios';
import reissueToken from './reissue';

const axiosInstance = axios.create({
  //baseURL: 'http://13.125.207.33:8080/',
  withCredentials: true
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, async error => {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && error.response.data === "access token expired") {
    try {
      await reissueToken();
      originalRequest.headers['Authorization'] = localStorage.getItem('token');
      return axiosInstance(originalRequest);
    } catch (reissueError) {
      return Promise.reject(reissueError);
    }
  }
  return Promise.reject(error);
});

export default axiosInstance;