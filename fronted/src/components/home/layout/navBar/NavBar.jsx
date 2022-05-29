import React from 'react'
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { MenuAlt1Icon, XIcon } from "@heroicons/react/solid"
import { Fragment } from "react"
import logo from '../../../../img/logo-con-nombre-ajustado-minuscula-rosa.png';
import { NavLink } from 'react-router-dom';

const navigation = [
    {
        name: 'Home',
        href: '/',
        current: true,
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
    },
    {
        name: 'Perfil',
        href: '/perfil',
        current: false,
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
    },
    {
        name: 'Ajustes',
        href: '/ajustes',
        current: false,
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
    },
    {
        name: 'Salir',
        href: '/entrar',
        current: false,
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export const NavBar = () => {
    return (
        <>
            {/* Navbar */}
            <div className='bg-hardpurple-100'>
                <Disclosure as="nav" className="flex-shrink-0 bg-hardpurple-400 border-b-2 border-hardpurple-200">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                                <div className="relative flex items-center justify-between h-16">
                                    {/* Logo section */}
                                    <NavLink to={`/`} >
                                    <div className="flex items-center px-2 lg:px-0 xl:w-64">
                                        <div className="flex-shrink-0 min-w-min">
                                            <img
                                                className="h-14 w-auto"
                                                src={logo}
                                                alt="Workflow"
                                            />
                                        </div>
                                    </div>
                                    </NavLink>
                                    <div className="flex lg:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="bg-hardpurple-400 text-hardpurple-100 inline-flex items-center 
                                        justify-center p-2 rounded-md text-bg-hardpurple-100 hover:text-white hover:bg-hardpurple-400 
                                        ring-hardpurple-100 ring-offset-hardpurple-600 ring-offset-1 ring-2 outline-none 
                                        focus:outline-none focus:ring-3 focus:ring-offset-1 focus:ring-offset-hardpurple-600 focus:ring-logo-500">
                                            <span className="sr-only">Abrir menu</span>
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <MenuAlt1Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                    {/* Links section */}
                                    <div className="hidden lg:block lg:w-80">
                                        <div className="flex items-center justify-end">
                                            <div className="flex">
                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="flex gap-1 px-3 py-2 rounded-md text-base font-semibold text-hardorange-300 hover:text-gray-400 hover:border-b-2 border-b-2 border-hardpurple-400 hover:border-hardorange-300"
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.icon}{item.name}
                                                    </a>
                                                ))}
                                            </div>
                                            {/* Profile dropdown */}
                                            <Menu as="div" className="ml-4 relative flex-shrink-0">
                                                <div>
                                                    <Menu.Button className="bg-indigo-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white">
                                                        <span className="sr-only">Abrir menu</span>
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >

                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="lg:hidden">
                                <div className="bg-hardpurple-400 px-2 pt-2 pb-3 space-y-1">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'flex gap-1 text-white bg-logo-500'
                                                    : 'flex gap-1 text-white hover:bg-hardpurple-300',
                                                'block px-3 py-2 rounded-md text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.icon}{item.name}
                                        </a>
                                    ))}
                                </div>

                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    )
}
