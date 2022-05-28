import React from 'react'
import { NavLink } from "react-router-dom"

export const Buttons = () => {
    return (
        <>
            {/* Action buttons */}
            <div className="flex flex-col w-full xl:flex-col">
                <NavLink to='/' ><button
                    type="button"
                    className="mt-12 xl:w-full w-full font-bold inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base rounded-md text-gray-600 bg-slate-100 hover:bg-slate-200 focus:bg-slate-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                </button>
                </NavLink>
            </div>

            <div className="flex flex-col w-full sm:flex-row xl:flex-col">
                <NavLink to='/home' ><button
                    type="button"
                    className=" xl:w-full w-full font-bold inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base rounded-md text-gray-600 bg-slate-100 hover:bg-slate-200 focus:bg-slate-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Eventos
                </button>
                </NavLink>
            </div>
            
            <div className="flex flex-col w-full sm:flex-row xl:flex-col">
                <NavLink to='/home' ><button
                    type="button"
                    className="mt-12 xl:w-full w-full font-bold inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base rounded-md text-gray-600 bg-slate-100 hover:bg-slate-200 focus:bg-slate-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Perfil
                </button>
                </NavLink>
            </div>
            
            <div className="flex flex-col w-full sm:flex-row xl:flex-col">
                <NavLink to='/home' ><button
                    type="button"
                    className=" xl:w-full w-full font-bold inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base rounded-md text-gray-600 bg-slate-100 hover:bg-slate-200 focus:bg-slate-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Salir
                </button>
                </NavLink>
            </div>
        </>
    )
}
