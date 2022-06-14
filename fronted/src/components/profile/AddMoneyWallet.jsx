import React, { useState } from 'react'
import { AddMoneyWalletModal } from './AddMoneyWalletModal';

export const AddMoneyWallet = ({
    userLoggedIn,
    updateUser,
    setUserLoggedIn,
}) => {
    const [isOpenWallet, setIsOpenWallet] = useState(false);

    return (
        <>
            <AddMoneyWalletModal
                userLoggedIn={userLoggedIn}
                updateUser={updateUser}
                isOpenWallet={isOpenWallet}
                setIsOpenWallet={setIsOpenWallet}
                setUserLoggedIn={setUserLoggedIn}
            />
            <div className='text-center mt-8 text-xl'>
                Saldo actual : {userLoggedIn.wallet} €
            </div>
            <div className='w-52 mx-auto '>
                <button
                    type="button"
                    className="pl-9 flex w-full text-center my-8 bg-logo-100 hover:bg-logo-200 ease-linear duration-300 py-1 px-2 rounded-3xl"
                    onClick={() => {
                        setIsOpenWallet(true)
                    }}
                >
                    Ingresar dinero
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    className="ml-2 h-6 w-6" fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </button>
            </div>
        </>
    )
}
