import axios from 'axios'; 
 
const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || 'https://udaanbackend-z5tw.vercel.app/api', 
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