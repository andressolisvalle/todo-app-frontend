import axios from "axios";


export const loginUser = async (data: { username: string; password: string }) => {
  
  try {
    const response = await axios.post('http://localhost:3001/auth/login', data);
    localStorage.setItem('token', response.data.accessToken); 
    return response.data;
  } catch (error) {
    console.error('Error iniciando sesión', error);
  }

};

export const registerUser = async (data: { username: string; password: string }) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('Error iniciando sesión', error);
  }

};

export const createTask = async (data: { title: string, description: string, status: string, dueDate: string }) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post('http://localhost:3001/tasks',data,
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
    await axios.put(`http://localhost:3001/tasks/${data.id}`,data,
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
    await axios.delete(`http://localhost:3001/tasks/${data.id}`, {
      headers: { Authorization: `Bearer ${token}` }
  });
  } catch (error) {
    console.error('Error al editar la tarea', error);
  }
};