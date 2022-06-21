import React from 'react'
import { useLocation, Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'

export const RentCorrect = () => {

    let location = useLocation();
    const rent = location.state.rent;

    console.log(rent)

    if (!rent) {
        return <Navigate to="/" replace={true} />
    }

    const month = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];
    

    return (
        <>
            <div className='bg-hardpurple-100 '>
                <div className='py-10 min-h-screen bg-gradient-to-b from-hardpurple-400 via-hardpurple-100 to-hardpurple-400'>
                    <div className='py-10 w-10/12 mx-auto bg-gray-100 rounded-3xl border-4 border-logo-500'>
                        <div className='mx-auto'>
                            <div className='p-4 ease-linear duration-300 rounded w-6/12 mx-auto text-center text-shadow-lg shadow-xl bg-green-300'>
                                <h1 className='text-5xl my-8'>Pista alquilada correctamente</h1>
                                <h2 className='text-3xl my-8'>Recuerde que ha alquilado la pista para el dia 
                                {
                                isNaN(rent.date.substr(5, 2)) ? (
                                ` ${rent.date.substr(7, 2)} de ${month[Number(rent.date.substr(5, 1)) - 1]} del ${rent.date.substr(0, 4)}`
                                ) : (
                                ` ${rent.date.substr(8, 2)} de ${month[Number(rent.date.substr(5, 2)) - 1]} del ${rent.date.substr(0, 4)}`
                                )
                            }
                                </h2>
                            </div>
                            <div className='mt-10 ease-linear duration-300 rounded w-6/12 mx-auto text-center text-shadow-lg'>
                                <NavLink to='/' className="text-xl my-8">Volver a inicio</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
