import React, { useEffect } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { changeData } from "./ChangeData"
import { FlagMessage } from '../commons/FlagMessage';

export const UpdateEmail = ({
    userLoggedIn,
    updateUser,
    setUserLoggedIn
}) => {

    const {
        showMessageSucess
    } = FlagMessage()

    const validation = Yup.object().shape({
        email: Yup.string().email(),
    });

    const formik = useFormik({
        initialValues: {
            email: userLoggedIn.email,
        },
        validationSchema: validation,
        onSubmit: (values) => {
            updateUser(userLoggedIn.id, values);
            changeData(3);
            setUserLoggedIn(userLoggedIn=>({...userLoggedIn, email:values.email}));
            showMessageSucess();
        }
    });
    useEffect(() => {
        formik.setFieldValue("email",userLoggedIn.email)
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [userLoggedIn.email])
    return (
        <>
            <div className='w-9/12 mx-auto h-12 items-center flex border-y-2 mt-4'>
                <div className='grow'>
                    <label htmlFor="name" className="mr-9 block text-xl font-medium text-gray-700 w-5/12">
                        Email:
                    </label>
                </div>
                <div className='grow'>
                    <h2 id='h2-email' className='text-center text-xl'>{userLoggedIn.email}</h2>
                    <input
                        placeholder='Email'
                        type="hidden"
                        id="email"
                        autoComplete="email"
                        className=" py-1 block w-full outline-none rounded-md border-2 focus:border-4 focus:ring-hardpurple-400 border-hardpurple-300"
                        hidden='false'
                        {...formik.getFieldProps("email")}
                    />
                    {formik.getFieldMeta("email").error
                        && formik.getFieldMeta("email").touched
                        && (
                            <div className='text-xs text-red-500'>
                                {formik.getFieldMeta("email").error}
                            </div>
                        )
                    }
                </div>
                <div className='grow'>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6  float-right text-logo-600 hover:text-logo-900 ease-linear duration-300"
                        fill="none"
                        id='svg-email-edit'
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        onClick={() => {
                            changeData(3)
                        }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        hidden
                        id='svg-email-error'
                        className="h-7 w-7 float-right text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        onClick={() => {
                            changeData(3)
                        }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        hidden
                        id='svg-email-check'
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
