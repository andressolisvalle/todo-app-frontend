import axios from "axios";

const API_ROUTE = 'http://localhost:3001';

export const getTask = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_ROUTE}/tasks`,{ headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las tareas', error);
  }

};



export const loginUser = async (data: { username: string; password: string }) => {
  
  try {
    const response = await axios.post(`${API_ROUTE}/auth/login`, data);
    localStorage.setItem('token', response.data.accessToken); 
    return response.data;
  } catch (error) {
    console.error('Error iniciando sesión', error);
  }

};

export const registerUser = async (data: { username: string; password: string }) => {
  try {
    const response = await axios.post(`${API_ROUTE}/auth/register`, data);
    if(response.data == "El usuario ya existe") window.alert('El usuario ya existe');
    return response.data;
  } catch (error) {
    window.alert(''+error);
    console.error('Error iniciando sesión', error);
  }

};

export const createTask = async (data: { title: string, description: string, status: string, dueDate: string }) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(`${API_ROUTE}/tasks`,data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error('Error al crear la tarea', error);
  }
};

export const editTask = async (data: { id: string, title: string, description: string, status: string, dueDate: string }) => {
  const token = localStorage.getItem('token');
  console.log(data.id);
  try {
    await axios.put(`${API_ROUTE}/tasks/${data.id}`,data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error('Error al editar la tarea', error);
  }
};

export const deleteTask = async (data: { id: number}) => {
  const token = localStorage.getItem('token');
  console.log(data.id);
  try {
    await axios.delete(`${API_ROUTE}/tasks/${data.id}`, {
      headers: { Authorization: `Bearer ${token}` }
  });
  } catch (error) {
    console.error('Error al editar la tarea', error);
  }
};