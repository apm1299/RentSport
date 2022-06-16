import React, { useEffect, useState } from 'react'
import { useCenter } from '../../services/useCenter';
import { MyTab } from './Tab'
import { Spinner } from '../commons/Spinner';
import { useParams } from 'react-router-dom';
import { EditCenterModal } from './EditCenterModal';
import { DeleteCenterModal } from './DeleteCenterModal';
import { useUser } from '../../services/useUser';
import { useAuth } from '../../services/useAuth';
import { InfoCenter } from './InfoCenter';

export const Center = () => {
    const {
        center,
        isLoading,
        getCenter,
        setLoading,
        setCenter,
        deleteCenter,
    } = useCenter()
    
    const { userLoggedIn } = useUser();
    const { user } = useAuth();
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
            {center.userAdmin && user &&
                <InfoCenter
                center={center}
                user={user}
                setIsOpenDeleteCenter={setIsOpenDeleteCenter}
                setIsOpenEditCenter={setIsOpenEditCenter}
                MyTab={MyTab}
                userLoggedIn={userLoggedIn}
                />
            }

        
        </>
    )
}
