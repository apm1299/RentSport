import React from 'react'
import { useUser } from '../../services/useUser';
import { UpdateName } from './UpdateName'
import { UpdateSurnames } from './UpdateSurnames'
import { UpdateEmail } from './UpdateEmail'
import { UpdateImage } from './UpdateImage';
import { ContainerUpdatePassword } from './ContainerUpdatePassword';
import { Spinner } from '../commons/Spinner';
import { AddMoneyWallet } from './AddMoneyWallet';

export const Profile = () => {
    const {
        updateUser,
        userLoggedIn,
        setUserLoggedIn,
        isLoading
    } = useUser();
    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <div className='bg-hardpurple-100 '>
                <div className=' py-10 min-h-screen bg-gradient-to-b from-hardpurple-400 via-hardpurple-100 to-hardpurple-400'>
                    <div id='separate1' className="block lg:w-8/12 w-11/12 b-8 mx-auto pt-4 bg-white border-4 border-logo-500 px-12 rounded-3xl">
                        <div className="flex items-center border-b-2 border-logo-300 mb-8">
                            <h1 className="flex-1 text-xl italic font-medium">Perfil</h1>
                        </div>
                        {
                            userLoggedIn && (
                                <UpdateImage
                                    updateUser={updateUser}
                                    userLoggedIn={userLoggedIn}
                                    setUserLoggedIn={setUserLoggedIn}
                                />
                            )
                        }
                        {
                            userLoggedIn && (
                                <UpdateName
                                    updateUser={updateUser}
                                    userLoggedIn={userLoggedIn}
                                    setUserLoggedIn={setUserLoggedIn}
                                />
                            )
                        }
                        {
                            userLoggedIn && (
                                <UpdateSurnames
                                    updateUser={updateUser}
                                    userLoggedIn={userLoggedIn}
                                    setUserLoggedIn={setUserLoggedIn}
                                />
                            )
                        }
                        {
                            userLoggedIn && (
                                <UpdateEmail
                                    updateUser={updateUser}
                                    userLoggedIn={userLoggedIn}
                                    setUserLoggedIn={setUserLoggedIn}
                                />
                            )
                        }
                        {/* {
                            userLoggedIn && (
                                <AddMoneyWallet
                                    updateUser={updateUser}
                                    userLoggedIn={userLoggedIn}
                                    setUserLoggedIn={setUserLoggedIn}
                                />
                            )
                        } */}
                        {
                            userLoggedIn && (
                                <ContainerUpdatePassword
                                    userLoggedIn={userLoggedIn}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
