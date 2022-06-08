import React, { useEffect } from 'react'
import { useCenter } from '../../services/useCenter';
import logo from '../../img/logo-color.png'
import { MyTab } from './Tab'
import { Spinner } from '../commons/Spinner';
import { useParams } from 'react-router-dom';

export const Center = () => {
    const {
        center,
        isLoading,
        getCenter,
        setLoading,
        setCenter
    } = useCenter()

    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        const callToGetCenter = async () => {
            setCenter(await getCenter(id));
            setLoading(false);
        }
        callToGetCenter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='bg-hardpurple-100 '>
            <div className='py-10 min-h-screen bg-gradient-to-b from-hardpurple-400 via-hardpurple-100 to-hardpurple-400'>
                <div className='py-10 w-10/12 mx-auto bg-white rounded-3xl border-4 border-logo-500'>
                    <div className='mx-auto flex'>
                        <div className='ease-linear duration-300 w-40 lg:w-52 xl:w-60 mx-auto '>
                            <img className='pl-12 rounded-full mx-auto' src={logo} alt="logo-color" />
                        </div>
                        <div className='float-right'>
                            <div className=''>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className=" h-8 w-8 mt-6 mr-6 cursor-pointer hover:text-logo-500 text-hardpurple-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    onClick={() => {
                                    }}
                                >
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className=" h-8 w-8 mt-6 mr-6 cursor-pointer hover:text-logo-500 text-hardpurple-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    onClick={() => {

                                    }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className='text-center'>
                        <h1 className='font-bold text-xl'>{center.name}</h1>
                        <h3>{center.locality}({center.province})</h3>
                    </div>
                    {
                        center && (
                            <MyTab
                                center={center}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
