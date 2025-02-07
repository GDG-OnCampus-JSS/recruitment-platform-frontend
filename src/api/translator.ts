// translator.js
import axios from 'axios';
import { apiEndUrl } from './urls';

// Create an instance of axios with custom configuration
const axiosInstance = axios.create({
  baseURL: apiEndUrl,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

export default axiosInstance;
