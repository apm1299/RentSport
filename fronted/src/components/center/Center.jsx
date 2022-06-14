import React, { useEffect, useState } from 'react'
import { useCenter } from '../../services/useCenter';
import { MyTab } from './Tab'
import { Spinner } from '../commons/Spinner';
import { useParams } from 'react-router-dom';
import { EditCenterModal } from './EditCenterModal';
import { DeleteCenterModal } from './DeleteCenterModal';

export const Center = () => {
    const {
        center,
        isLoading,
        getCenter,
        setLoading,
        setCenter,
        deleteCenter,
    } = useCenter()

    const { id } = useParams();
    const [isOpenEditCenter, setIsOpenEditCenter] = useState(false);
    const [isOpenDeleteCenter, setIsOpenDeleteCenter] = useState(false);


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
        <>
            <DeleteCenterModal
                center={center}
                isOpenDeleteCenter={isOpenDeleteCenter}
                setIsOpenDeleteCenter={setIsOpenDeleteCenter}
                deleteCenter={deleteCenter}
            />
            <EditCenterModal
                center={center}
                setCenter={setCenter}
                setIsOpenEditCenter={setIsOpenEditCenter}
                isOpenEditCenter={isOpenEditCenter}
            />
            <div className='bg-hardpurple-100 '>
                <div className='py-10 min-h-screen bg-gradient-to-b from-hardpurple-400 via-hardpurple-100 to-hardpurple-400'>
                    <div className='py-10 w-10/12 mx-auto bg-gray-50 rounded-3xl border-4 border-logo-500'>
                        <div className='mx-auto flex'>
                            <div className='ease-linear duration-300 w-40 lg:w-52 xl:w-60 mx-auto '>
                                <div className='pl-12'>
                                <img className=' rounded-xl mx-auto'
                                src={center.image ? center.image : 'https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png'} 
                                alt="logo-color" 
                                />
                                </div>
                            </div>
                            <div className='float-right'>
                                <div className=''>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className=" h-8 w-8 mt-6 mr-6 cursor-pointer hover:text-logo-500 text-hardpurple-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        onClick={() => {
                                            setIsOpenDeleteCenter(true)
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
                                            setIsOpenEditCenter(true);
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
        </>
    )
}
