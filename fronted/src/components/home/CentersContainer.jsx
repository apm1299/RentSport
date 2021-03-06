import React from 'react'
import { NavLink } from 'react-router-dom';

export const CenterContainer = ({
    centers,
}) => {
    return (
        <div id='centers' className='w-ful' >
            {
                centers.length > 0
                    ? (
                        <div className='block'>
                            {centers.map((center, idx) => (
                                <NavLink to={`/centro/${center.id}`} >
                                    <div className=' flex gap-4 ease-linear duration-300 hover:border-logo-500 border-2 border-gray-300 rounded p-4 my-4'
                                        key={`${center.name}-${idx}`}
                                    >
                                        <div className='flex-none w-24 aspect-square pr-2 border-r-2 border-logo-500'>
                                            <img src={center.image ? center.image : 'https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png'}
                                                alt={center.name}
                                            />
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-xl'>{center.name}</h3>
                                            <h3>{center.locality}({center.province})</h3>
                                        </div>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    )
                    : (
                        <div className='ease-linear duration-300 hover:border-logo-500 border-2 border-gray-300 rounded p-4 my-4'>
                            <p>No hay Centros Deportivos</p>
                        </div>
                    )
            }
        </div>
    )
}
