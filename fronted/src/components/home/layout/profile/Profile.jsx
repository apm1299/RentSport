import React from 'react'
import { Buttons } from '../buttons/Buttons'
import logo from '../../../../img/logo-color.png';

export const Profile = () => {
    return (
        <>
            {/* Account profile */}
            <div className="flex-none xl:px-8 lg:flex">
                <div className="flex-1 min-w-0  xl:flex">
                    <div className="xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200">
                        <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 space-y-8">
                                    <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block">
                                        {/* Profile */}
                                        <div className="flex items-center space-x-3 pr-4">
                                            <div className="flex-shrink-0 h-12 w-12">
                                                <img
                                                    className="h-12 w-12 rounded-full"
                                                    src={logo}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-sm font-medium text-gray-900">RentSport</div>
                                                <a href="#" className="group flex items-center space-x-2.5">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-900 font-medium">
                                                        Administrador
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                        {/* Action buttons */}
                                        <Buttons/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
