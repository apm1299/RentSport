import React from 'react'
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { MenuAlt1Icon, XIcon } from "@heroicons/react/solid"
import { Fragment } from "react"
import logo from '../../../../img/logo-con-nombre-ajustado-minuscula-rosa.png';

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Perfil', href: '/perfil', current: false },
    { name: 'Ajustes', href: '/ajustes', current: false },
    { name: 'Salir', href: '/login', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export const NavBar = () => {
    return (
        <>
            {/* Navbar */}
            <Disclosure as="nav" className="flex-shrink-0 bg-white">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                            <div className="relative flex items-center justify-between h-16">
                                {/* Logo section */}
                                <div className="flex items-center px-2 lg:px-0 xl:w-64">
                                    <div className="flex-shrink-0 min-w-min">
                                        <img
                                            className="h-14 w-auto"
                                            src={logo}
                                            alt="Workflow"
                                        />
                                    </div>
                                </div>
                                <div className="flex lg:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-400 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
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
                                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:text-gray-400"
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                        {/* Profile dropdown */}
                                        <Menu as="div" className="ml-4 relative flex-shrink-0">
                                            <div>
                                                <Menu.Button className="bg-indigo-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white">
                                                    <span className="sr-only">Open user menu</span>
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
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'text-white bg-indigo-800'
                                                : 'text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>

                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    )
}
