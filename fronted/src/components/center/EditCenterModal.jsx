import { Transition } from '@headlessui/react'
import React from 'react'
import { EditCenter } from './EditCenter'
import { NewInstallation } from './NewInstallation'

export const EditCenterModal = ({
    center,
    isOpenEditCenter,
    setIsOpenEditCenter,
}) => {
    return (
        <>
            <Transition show={isOpenEditCenter}>
                <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-10/12 lg:w-7/12 xl:w-6/12 my-6 mx-auto max-w-7xl rounded-l-lg h-5/6 overflow-y-auto">
                        <div className="pb-8 pt-8 border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="text-center font-bold text-3xl">
                                <h1>{center.name}</h1>
                            </div>
                            <EditCenter
                                center={center}
                                setIsOpenEditCenter={setIsOpenEditCenter}
                            />
                            <NewInstallation
                                setIsOpenEditCenter={setIsOpenEditCenter}
                            />
                        </div>
                    </div>
                </div>
                <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
            </Transition>
        </>
    )
}
