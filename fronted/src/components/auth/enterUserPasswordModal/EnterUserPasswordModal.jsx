/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Transition } from '@headlessui/react'
import * as Yup from "yup";
import { useFormik } from 'formik';

export const EnterUserPasswordModal = ({
    userLogin,
    updateWorker,
    isOpenEnterUserPasswordModal,
    setIsOpenEnterUserPasswordModal,
}) => {

    const validation = Yup.object().shape({
        password: "",
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            user: "/api/users/1",  //AQUIVAUSEERLOGIN.ID
        },
        validationSchema: validation,
        onSubmit: (values) => {
            updateWorker(userLogin.id, values);
            formik.resetForm();
        }
    });

    return (
        <>
            <Transition
                show={isOpenEnterUserPasswordModal}
            >
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-10/12 lg:w-5/12 xl:w-4/12 my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="pb-8 pt-4 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className='w-9/12 mx-auto'>
                                <label htmlFor="password" className="my-4 font-bold text-2xl text-center block text-black">
                                    Introduce tu contraseña actual
                                </label>
                                <div className="mt-1">
                                    <input
                                        {...formik.getFieldProps("password")}
                                        required
                                        type="password"
                                        id="password"
                                        autoComplete="password"
                                        className="outline-none py-3 px-4 block w-full shadow-sm rounded-md border-2 border-logo-500 focus:border-logo-600"
                                    />
                                    {formik.getFieldMeta("password").error
                                        && formik.getFieldMeta("password").touched
                                        && (
                                            <div className='text-xs text-red-500'>
                                                {formik.getFieldMeta("password").error}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div>
                                <div className='flex pt-4 w-9/12 mx-auto'>
                                    <div className='w-full'>
                                        <button
                                            type="button"
                                            onClick={formik.handleSubmit}
                                            className="ease-linear duration-300 w-11/12 h-9 rounded bg-hardpurple-400 hover:bg-hardpurple-500
                                            active:bg-buttonblue-600 text-white font-bold my-2 text-center"
                                        >
                                            Continuar
                                        </button>
                                    </div>
                                    <div className='w-full'>
                                        <button
                                            onClick={() => setIsOpenEnterUserPasswordModal(false)}
                                            className="ease-linear duration-300 w-11/12 float-right h-9 rounded bg-hardpurple-400 hover:bg-hardpurple-500
                                        active:bg-buttonblue-600 text-white font-bold my-2 text-center"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
            </Transition>
        </>
    )
}
