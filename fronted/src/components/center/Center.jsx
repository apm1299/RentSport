import React from 'react'
import { useCenter } from '../../services/useCenter';
import logo from '../../img/logo-color.png'
import { MyTab } from './Tab'
import { Spinner } from '../commons/Spinner';

export const Center = () => {
    const {
        center,
        isLoading,
    } = useCenter()
    if (isLoading) {
        return <Spinner/>
      }
    return (
        <div className='bg-hardpurple-100 '>
            <div className='py-10 min-h-screen bg-gradient-to-b from-hardpurple-400 via-hardpurple-100 to-hardpurple-400'>
                <div className='py-10 w-11/12 mx-auto bg-white rounded-3xl'>
                    <div className='w-2/12 mx-auto'>
                        <img className='rounded-full w-8/12 mx-auto' src={logo} alt="logo-color" />
                    </div>
                    <div className='text-center'>
                        <h1 className='font-bold text-xl'>{center.name}</h1>
                        <h3>{center.locality}({center.province})</h3>
                    </div>
                    <MyTab />
                </div>
            </div>
        </div>
    )
}
