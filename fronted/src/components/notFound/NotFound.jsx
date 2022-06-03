import React from 'react'
import { NavLink } from "react-router-dom"
import imgNotFound from "./norFound-recortado.png"

export const NotFound = () => {
    return (
        <div
            class="flex items-center justify-center w-screen min-h-screen bg-gradient-to-b from-hardpurple-400 via-hardpurple-200 to-hardpurple-400"
        >
            <div class="ease-linear duration-300 py-20 bg-white rounded-md shadow-xl w-6/12 xl:w-6/12">
                <div class="flex flex-col items-center min-w-6/12">
                    <div className='ease-linear duration-300 flex items-center w-9/12 xl:w-6/12 md:10/12 sm:11/12 mx-auto'>
                        <img className='w-full' src={imgNotFound} alt="notFound" />
                        <h1 class="ease-linear duration-300 font-bold text-logo-400 text-6xl sm:text-4-12 md:text-8xl xl:text-9xl">404</h1>
                    </div>
                    <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span class="text-logo-400">Oops!</span> Página no encontrada
                    </h6>
                    <p class="mb-8 text-center text-gray-500 md:text-lg">
                        La página que buscas no existe.
                    </p>

                    <div className="flex flex-col w-full ">
                        <NavLink to='/' >
                            <p className='ease-linear duration-300 xl:w-4/12 md:w-4/12 lg:w-4/12 w-6/12 text-center mx-auto px-6 py-2 text-sm font-semibold text-black bg-logo-100'>Volver a inicio</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
