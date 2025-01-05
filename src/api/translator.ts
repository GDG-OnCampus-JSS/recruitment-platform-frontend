// translator.js
import axios from 'axios';

// Create an instance of axios with custom configuration
const axiosInstance = axios.create({
  baseURL: 'https://your.api.base.url', // Replace with your API's base URL
  timeout: 10000, // Optional timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // Add any other custom headers you need
  },
});

export default axiosInstance;
