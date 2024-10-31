import axios from "axios";

const API_BASE_URL = 'http://localhost:30001';

const api = axios.create({
    baseURL:'http://localhost:3001/', // URL base para las peticiones
    headers: {
      'Content-Type': 'application/json',
    },
  });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export const loginUser = async (data: { username: string; password: string }) => {
    try {
        const response = await axios.post('/auth/login', data);
        console.log('Login exitoso', response); // Imprime el token en consola
        // localStorage.setItem('token', response); // Almacena el token
        return response.data;
    } catch (error) {
        console.error('Error iniciando sesión', error);
    }
    
  };