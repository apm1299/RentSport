import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { changeData } from "./ChangeData"

export const UpdateImage = ({
    userLoggedIn,
    updateUser,
}) => {

    const validation = Yup.object().shape({
        image: Yup.string().max(255).min(3),
    });

    const formik = useFormik({
        initialValues: {
            image: userLoggedIn.image,
        },
        validationSchema: validation,
        onSubmit: (values) => {
            updateUser(userLoggedIn.id, values);
            changeData(2)
        }
    });

    return (
        <>
            <div className='w-9/12 mx-auto py-2 flex border-y-2 mt-4'>
                <div className='grow'>
                    <label htmlFor="name" className="block text-xl font-medium text-gray-700 w-5/12">
                        Foto:
                    </label>
                </div>
                <div className='grow'>
                    <img id='h2-image'
                        className='w-3/12 mx-auto'
                        src='https://i.pinimg.com/564x/c1/76/0c/c1760c132a99389e6e0e2c27c2c44b06.jpg'
                        alt=''
                    />
                    <input
                        placeholder='Imagen'
                        type="hidden"
                        id="image"
                        autoComplete="image"
                        className="py-1 block w-full focus:ring-softblue-600 rounded-md border-2 border-softblue-800"
                        hidden='false'
                    />
                </div>
                <div className='grow'>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6  float-right text-logo-600 hover:text-logo-900 ease-linear duration-300"
                        fill="none"
                        id='svg-image-edit'
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        onClick={() => {
                            changeData(2)
                        }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        hidden
                        id='svg-image-error'
                        className="h-7 w-7 float-right text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        onClick={() => {
                            changeData(2)
                        }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        hidden
                        id='svg-image-check'
                        className="h-7 w-7 float-right text-lime-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        onClick={formik.handleSubmit}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
        </>
    )
}
