import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import "../app/globals.css";
import { loginUser } from '@/services/apiservice';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('token');
      }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const responce = await loginUser({ username, password });
            if (responce==null) {
                window.alert('usuario o contraseña incorrecta');
            }
            router.push('/tasks'); 
        } catch (error) {
            console.error('Error iniciando sesión', error);
        }
    };

    return (


        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                     BIENVENIDO
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Inicia sesión en tu cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Nombre de Usuario
                                </label>
                                <input
                                    type="username"
                                    name="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="username"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                           
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Iniciar Sesion
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Aún no tienes una cuenta?{' '}
                                <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Registrate
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        // <form onSubmit={handleLogin}>
        //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        //     <button type="submit">Login</button>
        // </form>
    );
};

export default Login;
