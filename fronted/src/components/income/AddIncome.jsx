import { SearchIcon } from '@heroicons/react/solid'
import React  from 'react'
import { useUser } from '../../services/useUser';
import { FlagMessage } from '../commons/FlagMessage';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from '../../services/useAuth';
import { useIncome } from '../../services/useIncome';

export const AddIncome = () => {
    const { user } = useAuth();
    const { setSearchUser, users } = useUser();
    const { createIncome } = useIncome();
    const { showMessageSucess } = FlagMessage();

    const validation = Yup.object().shape({
        quantity: Yup.number().integer().required("Formato no valido"),
        userReceived: Yup.object().required()
    });

    const formik = useFormik({
        initialValues: {
            userMade: `/api/users/${user.id}`,
            date: new Date(),
            quantity: '',
            userReceived: null,
        },
        validationSchema: validation,
        onSubmit: (values) => {
            createIncome(values);
            formik.resetForm();
            showMessageSucess("Transferencia realizada");
        },
    });

    return (
        <>
            <div className=' w-full block lg:flex'>
                <div className='mb-10 w-11/12 mx-auto lg:w-6/12'>
                    <div className="pb-2 pt-4 mr-4 bg-white">
                        <div className="w-11/12 flex-1 flex mx-auto lg:justify-end">
                            <div className="w-full">
                                <label htmlFor="search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative text-hardpurple-200 focus-within:text-logo-400">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <SearchIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <input
                                        id="search"
                                        name="search"
                                        className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 border-2 border-hardblue-500 bg-indigo-400 bg-opacity-25 text-gray-500 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
                                        placeholder="Buscar usuario"
                                        type="search"
                                        onChange={(e) => setSearchUser(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-y-auto h-96 bg-white py-4">
                        {users.length > 0 ? (
                            <div className="gap-4 flex flex-col">
                                {users.map((user, idx) => (
                                    <button
                                        type="button"
                                        className={`w-11/12 mx-auto flex gap-2 ease-linear duration-300
                                                            bg-logo-100 hover:bg-logo-300 border-2 border-logo-200 rounded p-4
                                                            ${formik.getFieldProps("userReceived")?.value?.id === user.id
                                                ? "ring ring-offset-2 bg-logo-500 ring-logo-500"
                                                : ""
                                            }`}
                                        key={`${user.id}-${idx}`}
                                        onClick={() =>
                                            formik.setFieldValue("userReceived",user)
                                        }
                                    >
                                        <div className="flex-none w-14 aspect-square pr-2 border-r-2 border-logo-500">
                                            <img
                                                src={user.image ? user.image : 'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'}
                                                className="object-cover rounded-full border-2 border-hardblue-500"
                                                alt={''}
                                            />
                                        </div>
                                        <div className="flex flex-col items-start flex-grow overflow-hidden">
                                            <h3 className="text-xl">
                                                {user?.name} {user?.surnames}
                                            </h3>
                                            <p className="text-xs">{user?.email}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="w-11/12 mx-auto flex gap-2 ease-linear duration-300 bg-logo-200 border-2 border-hardblue-500 rounded p-4 my-2">
                                <p>No hay usuarios</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className='w-11/12 mx-auto lg:w-6/12'>
                    <div className='w-9/12 mx-auto py-2'>
                        <label className='text-lg tex'>
                            Introduzca cantidad a ingresar
                        </label>
                        <input
                            {...formik.getFieldProps("quantity")}
                            required
                            placeholder="Cantidad"
                            type="text"
                            id="quantity"
                            autoComplete="quantity"
                            className="py-3 px-4 block w-full shadow-sm focus:ring-logo-200 rounded-md border-2 border-hardpurple-300"

                        />
                        {formik.getFieldMeta("quantity").error &&
                            formik.getFieldMeta("quantity").touched && (
                                <div className="text-xs text-red-500">
                                    {formik.getFieldMeta("quantity").error}
                                </div>
                            )}
                    </div>
                    <div className='w-9/12 mx-auto py-2'>
                        <div className='flex pt-4'>
                            <div className='w-full mr-1'>
                                <button
                                    type="button"
                                    onClick={formik.handleSubmit}
                                    className="my-2 block mx-auto w-full h-12 xl:h-9 rounded bg-hardpurple-400 hover:bg-hardpurple-300 active:bg-hardpurple-300 text-white font-bold text-center"
                                >
                                    Ingresar {formik.getFieldProps("userReceived").value && formik.getFieldProps("quantity").value ? (`a ${formik.getFieldProps("userReceived").value.name} ${formik.getFieldProps("userReceived").value.surnames} ${formik.getFieldProps("quantity").value}€`) : ('')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
