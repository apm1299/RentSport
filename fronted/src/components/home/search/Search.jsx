import React from 'react'
import { SearchIcon } from "@heroicons/react/solid"

export const Search = ({setSearch}) => {
    return (
        <>
            {/* Search section */}
            < div className="flex-1 flex justify-center lg:justify-end pb-4" >
                <div className="w-full px-2 lg:px-6">
                    <label htmlFor="search" className="sr-only">
                        Buscar
                    </label>
                    <div className="relative text-indigo-200 focus-within:text-gray-400">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-logo-300" aria-hidden="true" />
                        </div>
                        <input
                            id="search"
                            name="search"
                            className="block w-full text-lg pl-10 pr-3 py-3 border-2 border-logo-300 rounded-md leading-5 bg-fuchsia-100 bg-opacity-25 text-gray-800 font-bold placeholder-indigo-200 focus:outline-none focus:bg-slate-100 focus:ring-0 focus:placeholder-gray-400 focus:text-logo-500 sm:text-sm"
                            placeholder="Buscar"
                            type="search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div >
        </>
    )
}
