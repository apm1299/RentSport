import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCenter } from "../../services/useCenter";
import { FlagMessage } from "../commons/FlagMessage"
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";
import { SearchIcon } from "@heroicons/react/solid";
import { useRol } from "../../services/useRol";

export const NewCenterModal = ({
    user,
    users,
    setSearchUser,
    isOpenNewCenter,
    setIsOpenNewCenter
}) => {
    const { showMessageSucess } = FlagMessage()
    const { createCenter } = useCenter();
    const { addUserRolAdmin } = useRol();
    const [newImg, setNewImg] = useState([]);

    useEffect(() => {
        const callToGetProjectsUser = async () => {
            formik.setFieldValue("image", newImg[0].fileUrl);
            document.getElementById("imageSrc").src = newImg[0].fileUrl;
        };
        callToGetProjectsUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newImg]);

    const [userSelected, setUserSelected] = useState([]);
    useEffect(() => {
        const callToGetProjectsUser = async () => {
            formik.setFieldValue("userAdmin", `/api/users/${userSelected.id}`);
        };
        callToGetProjectsUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSelected]);
    const uploader = new Uploader({
        // Get production API keys from Upload.io
        apiKey: "free",
    });

    const validation = Yup.object().shape({
        name: Yup.string()
            .max(255)
            .min(3)
            .required("Se requiere minimo 3 caracteres"),
        locality: Yup.string()
            .max(255)
            .min(3)
            .required("Se requiere minimo 3 caracteres"),
        province: Yup.string()
            .max(255)
            .min(3)
            .required("Se requiere minimo 3 caracteres"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            locality: "",
            province: "",
            image: "",
            userAdmin: `/api/users/${userSelected.id}`,
        },
        validationSchema: validation,
        onSubmit: (values) => {
            createCenter(values);
            addUserRolAdmin(userSelected.id)
            setIsOpenNewCenter(false);
            showMessageSucess("Centro creado");
        },
    });
    return (
        <>
            <Transition show={isOpenNewCenter}>
                <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-10/12 lg:w-7/12 xl:w-6/12 my-6 mx-auto max-w-7xl rounded-l-lg h-5/6 overflow-y-auto">
                        <div className="pb-8 pt-8 border-0 shadow-lg relative flex flex-col w-full bg-hardpurple-200 outline-none focus:outline-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 postition absolute right-6 text-hardpurple-300 hover:text-hardpurple-500 ease-linear duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                onClick={() => setIsOpenNewCenter(false)}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            <div className="text-center font-bold text-3xl text-hardpurple-500 shadow-xl">
                                <h1>Nuevo centro</h1>
                            </div>
                            <div className='m-6 rounded-2xl bg-gray-200'>
                                <div className="mt-8 w-9/12 mx-auto mb-4">
                                    <label
                                        htmlFor="center-name"
                                        className="block text-xl font-medium text-gray-700"
                                    >
                                        Nombre del centro
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            {...formik.getFieldProps("name")}
                                            required
                                            placeholder="Nombre"
                                            type="text"
                                            id="name-center"
                                            autoComplete="name-center"
                                            className="outline-none py-3 px-4 block w-full shadow-sm focus:ring-softblue-600 rounded-md ring-1 ring-hardpurple-200 focus:ring-2 focus:ring-hardpurple-300"
                                        />
                                        {formik.getFieldMeta("name").error &&
                                            formik.getFieldMeta("name").touched && (
                                                <div className="text-xs text-red-500">
                                                    {formik.getFieldMeta("name").error}
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className="w-9/12 mx-auto mb-4">
                                    <label
                                        htmlFor="center-province"
                                        className="block text-xl font-medium text-gray-700"
                                    >
                                        Provincia
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            {...formik.getFieldProps("province")}
                                            required
                                            placeholder="Provincia"
                                            type="text"
                                            id="province-center"
                                            autoComplete="province-center"
                                            className="outline-none py-3 px-4 block w-full shadow-sm focus:ring-softblue-600 rounded-md ring-1 ring-hardpurple-200 focus:ring-2 focus:ring-hardpurple-300"
                                        />
                                        {formik.getFieldMeta("province").error &&
                                            formik.getFieldMeta("province").touched && (
                                                <div className="text-xs text-red-500">
                                                    {formik.getFieldMeta("province").error}
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className="w-9/12 mx-auto mb-4">
                                    <label
                                        htmlFor="center-locality"
                                        className="block text-xl font-medium text-gray-700"
                                    >
                                        Localidad
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            {...formik.getFieldProps("locality")}
                                            required
                                            placeholder="Localidad"
                                            type="text"
                                            id="locality-center"
                                            autoComplete="locality-center"
                                            className="outline-none py-3 px-4 block w-full shadow-sm focus:ring-softblue-600 rounded-md ring-1 ring-hardpurple-200 focus:ring-2 focus:ring-hardpurple-300"
                                        />
                                        {formik.getFieldMeta("locality").error &&
                                            formik.getFieldMeta("locality").touched && (
                                                <div className="text-xs text-red-500">
                                                    {formik.getFieldMeta("locality").error}
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className="w-9/12 mx-auto mb-4">
                                    <img id='imageSrc'
                                        className='w-32 h-32 mx-auto rounded-full border-solid border-2 border-hardpurple-300 shadow-2xl'
                                        src='https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png'
                                        alt=''
                                    />
                                    <div id=''>
                                        <UploadButton
                                            uploader={uploader}
                                            options={{ multi: false }}
                                            onComplete={(file) => setNewImg(file)}
                                        >
                                            {({ onClick }) => (
                                                <button
                                                    className="py-1 px-2 my-6 w-full bg-hardpurple-200 hover:bg-hardpurple-300 ease-linear duration-300 rounded-lg text-center text-white text-base font-semibold shadow-2xl"
                                                    onClick={onClick}
                                                >
                                                    Añadir imagen
                                                </button>
                                            )}
                                        </UploadButton>
                                    </div>
                                </div>
                                <div className="w-9/12 mx-auto mb-4">
                                    <label
                                        htmlFor="center-locality"
                                        className="block text-xl font-medium text-gray-700"
                                    >
                                        Administrador del centro
                                    </label>
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
                                                            ${userSelected && userSelected.id === user.id
                                                                ? "ring ring-offset-2 bg-logo-500 ring-logo-500"
                                                                : ""
                                                            }`}
                                                        key={`${user.id}-${idx}`}
                                                        onClick={() =>
                                                            setUserSelected(user)
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
                                <div>
                                    <div className='w-9/12 mx-auto py-2'>
                                        <div className='flex pt-4'>
                                            <div className='w-full mr-1'>
                                                <button
                                                    type="button"
                                                    onClick={formik.handleSubmit}
                                                    className="block mx-auto w-full h-9 rounded bg-hardpurple-400 hover:bg-hardpurple-300 active:bg-hardpurple-300 text-white font-bold my-2 text-center"
                                                >
                                                    Confirmar
                                                </button>
                                            </div>
                                            <div className='w-full ml-1'>
                                                <button
                                                    onClick={() => setIsOpenNewCenter(false)}
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
                </div>
                <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
            </Transition>
        </>
    );
};