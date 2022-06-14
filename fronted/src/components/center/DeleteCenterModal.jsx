import { Transition } from "@headlessui/react";
import React from "react";
import { useAuth } from "../../services/useAuth"
export const DeleteCenterModal = ({
    center,
    isOpenDeleteCenter,
    setIsOpenDeleteCenter,
    deleteCenter,
}) => {
    const { user } = useAuth();
    return (
        <>
            <Transition show={isOpenDeleteCenter}>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-10/12 lg:w-5/12 xl:w-4/12 my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="pb-8 pt-4 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div>
                                <h1 className="text-center font-bold text-2xl">
                                    ¿Seguro que desea eliminar el centro "{center.name}" ?
                                </h1>
                            </div>
                            <div>
                                <div className='w-9/12 mx-auto py-2'>
                                    <div className='flex pt-4'>
                                        <div className='w-full mr-1'>
                                            <button
                                                type="button"
                                                onClick={() => 
                                                    deleteCenter(center.id)
                                                    
                                                }
                                                className="block mx-auto w-full h-9 rounded bg-hardpurple-400 hover:bg-hardpurple-300 active:bg-hardpurple-300 text-white font-bold my-2 text-center"
                                            >
                                                Confirmar
                                            </button>
                                        </div>
                                        <div className='w-full ml-1'>
                                            <button
                                                onClick={() => setIsOpenDeleteCenter(false)}
                                                className="block mx-auto w-full h-9 rounded bg-logo-500 hover:bg-logo-400
                                        active:bg-logo-400 text-white font-bold my-2 text-center"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
            </Transition>
        </>
    );
};
