import { LockClosedIcon } from '@heroicons/react/solid'
import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../../img/logo-con-nombre-ajustado-minuscula.png'
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../../../services/useAuth';

export const Login = props => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setToken } = useAuth();

    const formik = useFormik({
        initialValues: {
            userIdentifier: "",
            password: "",
        },
        onSubmit: async (values) => {
            const headers = new Headers();
            headers.set("Accept", "application/ld+json");
            headers.set("Content-Type", "application/ld+json");

            await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers,
                credentials: "include",
                body: JSON.stringify(values, null, 2),
            })
                .then((response) => {
                    if (response.status === 200 || response.status === 204) {
                        const token = Cookies.get("jwt_hp");
                        setToken(token);
                        navigate(location.state.from ?? '/');
                    } else {
                        document.getElementById("errorLogin").hidden = false;
                    }
                })
                .catch((error) => console.error(error));
        },
    });
    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-hardpurple-600 to-hardpurple-200">
            <div id="containerLogin" className="max-w-md w-full space-y-8 bg-white p-6 rounded">
                <div>
                    <img
                        className="mx-auto h-16 w-auto"
                        src={logo}
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Identificate en tu cuenta de RentSport</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        ¿No tienes cuenta?{' '}
                        <NavLink to='/registro' className="font-medium text-indigo-600 hover:text-indigo-500">Registrate</NavLink>
                    </p>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email
                            </label>
                            <input
                                {...formik.getFieldProps("userIdentifier")}
                                id="userIdentifier"
                                name="userIdentifier"
                                type="email"
                                autoComplete="given-name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your email address"
                            />

                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <input
                                {...formik.getFieldProps("password")}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your password"
                            />

                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                {...formik.getFieldProps("password")}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                placeholder="Enter your password"
                            />

                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Recordarme
                            </label>
                        </div>

                        <div className="text-sm">
                            <NavLink to='/forgotPassword' className="font-medium text-indigo-600 hover:text-indigo-500">¿Has olvidado tu contraseña?</NavLink>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={formik.handleSubmit}
                        >
                            Entrar
                        </button>
                    </div>
                </form>
            </div>

        </div>)
}
