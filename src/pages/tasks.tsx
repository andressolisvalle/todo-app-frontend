import { useEffect, useState } from 'react';
import axios from 'axios';
import withAuth from '../utils/withAuth';
import "../app/globals.css";
import Modal from './editModal';
import CreateTask from './create-task';
import { deleteTask } from '@/services/apiservice';

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createMod, setCreateMod] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>(''); // Nuevo estado para el filtro

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            try {
                const { data } = await axios.get('http://localhost:3001/tasks', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks', error);
            }
        };
        fetchTasks();
    }, []);

    const handleEditClick = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id: number) => {
        const token = localStorage.getItem('token');
        if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            try {
                await deleteTask({id});
                setTasks(tasks.filter((task) => task.id !== id));
            } catch (error) {
                console.error('Error al eliminar la tarea', error);
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const closeCreateTask = () => {
        setCreateMod(false);
    };

    const handleCreateTask = () => {
        setCreateMod(true);
    };


    const filteredTasks = statusFilter
        ? tasks.filter((task) => task.status === statusFilter)
        : tasks;

    return (
        <div className="container px-60 py-10 ">
            <div className="overflow-x-auto h-96 shadow-md shadow-2xl ">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Lista de Tareas</h1>

                <div className="mb-4">
                    <label className="mr-2 font-semibold text-gray-800">Filtrar por estado:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
                    >
                        <option value="">Todos</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="en progreso">En progreso</option>
                        <option value="completada">Completada</option>
                    </select>
                    <button onClick={handleCreateTask}
                        className="mx-4 mt-4 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Agregar
                    </button>
                </div>

                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Título</th>
                            <th className="py-3 px-6 text-left">Descripción</th>
                            <th>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="py-3 px-6 text-left w-full  bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
                                >
                                    <option value="">Estado</option>
                                    <option value="pendiente">Pendiente</option>
                                    <option value="en progreso">En progreso</option>
                                    <option value="completada">Completada</option>
                                </select>
                            </th>
                            <th className="py-3 px-6 text-left">Fecha de Vencimiento</th>
                            <th className="py-3 px-6 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {filteredTasks.map((task) => (
                            <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{task.title}</td>
                                <td className="py-3 px-6 text-left">{task.description}</td>
                                <td className="py-3 px-6 text-left">{task.status}</td>
                                <td className="py-3 px-6 text-left">{task.dueDate}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <button
                                            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer"
                                            onClick={() => handleEditClick(task)}
                                        >
                                            ✏️
                                        </button>
                                        <div
                                            className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor-pointer"
                                            onClick={() => handleDeleteClick(task.id)}
                                        >
                                            🗑️
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                {/* Modal editar */}
                {isModalOpen && (
                    <Modal isOpen={isModalOpen} onClose={closeModal} task={selectedTask} />
                )}

                {/* Modal para crear tarea */}
                {createMod && (
                    <CreateTask isOpen={createMod} onClose={closeCreateTask} />
                )}
            </div>
        </div>
    );
};

export default withAuth(Tasks);
