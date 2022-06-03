import React from 'react'
import { changePasswordInput } from './ChangeData'
import { UpdatePassword } from "./UpdatePassword"


export const ContainerUpdatePassword = ({
    userLoggedIn,
}) => {

    return (
        <>
            <div className='w-52 mx-auto '>
                <button
                    type="button"
                    className="pl-6 flex w-full text-center my-8 bg-logo-100 hover:bg-logo-200 ease-linear duration-300 py-1 px-2 rounded-3xl"
                    onClick={() => {
                        changePasswordInput()
                    }}
                >
                    Cambiar contraseña
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-6 w-6"
                        id='arrow-sm-up'
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        hidden
                        id='arrow-sm-down'
                        className="ml-1 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                </button>
            </div>
            <UpdatePassword
                userLoggedIn={userLoggedIn}
            />
        </>
    )
}
