import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import logo from '../../img/logo-color.png'
import { getCenter } from '../../services/useCenter';
import { MyTab } from './tab/Tab'
 
export const Center = () => {
    const { id } = useParams();
    const [sportCenter, setSportCenter] = useState([]);

    useEffect(() => {
        const callToGetSportCenter = async () => {
            setSportCenter(await getCenter(id));
        }
        callToGetSportCenter();
    }, []);
  return (
    <div className='bg-gray-100 py-10 min-h-screen'>
        <div className='w-11/12 mx-auto bg-white rounded-3xl'>
            <div className='w-2/12 mx-auto'>
                <img className='rounded-full' src={logo} alt="logo-color" />
            </div>
            <div className='text-center'>
                <h1 className='font-bold text-xl'>{sportCenter.name}</h1>
                <h3>{sportCenter.locality}({sportCenter.province})</h3>
            </div>
            <MyTab/>
        </div>
    </div>
  )
}
