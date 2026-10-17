import axios from 'axios';

const API = axios.create({
  // Yahan apna backend URL daalo (jaise http://localhost:5000/api ya jo bhi tumhara server port hai)
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Request interceptor agar token use kar rahe ho
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;