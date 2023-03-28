import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://115.186.185.234:9010',
  });
  
  try {
    const token  = localStorage.getItem('token').replace(/['"]+/g, '');
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error retrieving token from local storage:', error);
  }

  
  


export default instance;