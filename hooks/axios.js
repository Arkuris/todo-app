import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://yourapi.com', // Replace with your API's base URL
});

instance.interceptors.request.use(
  (config) => {
    // Assuming you have the token stored in local storage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
