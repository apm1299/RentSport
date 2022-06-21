import { Transition } from '@headlessui/react'
import React, { useState } from 'react'
import { useFormik } from "formik";
import { useRental } from '../../services/useRental';
import { FlagMessage } from '../commons/FlagMessage';
import { useWallet } from '../../services/useWallet';
import { useAuth } from '../../services/useAuth';

export const PaymentModal = ({
    isOpenPayment,
    setIsOpenPayment,
    rentHoursSelected,
    activeOptionInstallation,
    dateCalendar,
    sports,
    activeOption,
    userLoggedIn,
    setRentHoursSelected,
    rentals,
    center,
    setFlag
}) => {

    async function createRental(values) {
        const headers = new Headers();
        headers.set("Accept", "application/ld+json");
        headers.set("Content-Type", "application/ld+json")
      
        await fetch('http://localhost:8000/api/rentals', {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify(values, null, 2),
        }).then(response => response.json()
            .then(retrieved => {
                console.log(retrieved);
                console.log(rentals);
               //rentals[rentals.length] = retrieved;
              // rentals = [...rentals, retrieved];
              setFlag(true);
      
                
            }))
            .catch(error => console.error(error))
      }

    const { user } = useAuth();
    const { collectionMoney } = useWallet();
    const { showMessageSucess, showMessageError } = FlagMessage()
    //const {  } = useRental();
    const [activeOptionType, setActiveOptionType] = useState(1);
    const formik = useFormik({
        initialValues: {
            sport: [],
            lessor: `api/users/${userLoggedIn.id}`,
            installation: [],
            type: "",
            date: "",
            schedule: "",
        },
        onSubmit: (values) => {
            if (userLoggedIn.wallet - (activeOptionInstallation.pricePerRange * rentHoursSelected.length) >= 0) {
                for (let i = 0; i < rentHoursSelected.length; i++) {
                    values.schedule = rentHoursSelected[i].id;
                    values.date = dateCalendar;
                    values.installation = `api/installations/${activeOptionInstallation.id}`;
                    values.sport = `api/sports/${activeOption}`;
                    values.type = `api/rental_types/${activeOptionType}`;
                    createRental(values, rentals);
                }
                collectionMoney(userLoggedIn.id, Number(userLoggedIn.wallet) - Number((activeOptionInstallation.pricePerRange * rentHoursSelected.length)));
                setRentHoursSelected([]);
                setIsOpenPayment(false);
                showMessageSucess("Pista alquilada");
            } else {
                showMessageError("Dinero insuficiente");
            }
        },
    });
    return (
        <Transition show={isOpenPayment}>
            <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-10/12 lg:w-7/12 xl:w-6/12 my-6 mx-auto max-w-7xl rounded-l-lg h-5/6 overflow-y-auto">
                    <div className="pb-8 pt-8 border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 postition absolute right-6 text-hardpurple-300 hover:text-hardpurple-500 ease-linear duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            onClick={() => setIsOpenPayment(false)}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        <div className="text-center font-bold text-3xl">
                            <h1>Reservar</h1>
                        </div>
                        <div>
                            <div className='w-9/12 mx-auto py-2'>

                                <h4>Fecha:</h4>
                                <h3 className='flex gap-2 border-2 border-gray-300 rounded px-2 my-2 bg-slate-200'>{dateCalendar}</h3>
                                <h4>Instalacion:</h4>
                                <h3 className='flex gap-2 border-2 border-gray-300 rounded px-2 my-2 bg-slate-200'>{activeOptionInstallation.name}</h3>
                                <h4>Horas seleccionadas</h4>
                                {
                                    rentHoursSelected.length > 0
                                    && (
                                        <div className='block'>
                                            {rentHoursSelected.map((rentHours, idx) => (
                                                <div className=' flex gap-2 border-2 border-gray-300 rounded px-2 my-2 bg-slate-200'
                                                    key={`${rentHours.id} - ${idx}`}
                                                >
                                                    <div>
                                                        <h3>{rentHours.startAt}-{rentHours.endAt}</h3>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                                <h4>Deporte</h4>
                                <h3 className='flex gap-2 border-2 border-gray-300 rounded px-2 my-2 bg-slate-200'>
                                    {sports?.find((s) => s.id === activeOption)?.name}
                                </h3>
                                {((center.userAdmin['id'] === user.id) ||
                                    (user && user.roles.find((r) => r === "ROLE_SUPERADMIN"))) && (
                                        <h4>Tipo</h4>
                                    )}
                                {((center.userAdmin['id'] === user.id) ||
                                    (user && user.roles.find((r) => r === "ROLE_SUPERADMIN"))) && (
                                        <select
                                            id="select-type"
                                            className=" bg-white py-3 px-2 block w-full shadow-sm border-2 border-gray-300 rounded-md"
                                            placeholder="Selecciona tipo"
                                        >
                                            <option className="text-gray-500" value={0}>
                                                Selecciona tipo
                                            </option>
                                            <option
                                                onClick={() => setActiveOptionType(1)}
                                                value='1'
                                            >
                                                Normal
                                            </option>
                                            <option
                                                onClick={() => setActiveOptionType(2)}
                                                value='2'
                                            >
                                                Evento
                                            </option>
                                        </select>
                                    )}
                                <h4>Total Pago</h4>
                                <h3 className='flex gap-2 border-2 border-gray-300 rounded px-2 my-2 bg-slate-200'>
                                    {activeOptionInstallation.pricePerRange * rentHoursSelected.length} €
                                </h3>
                            </div>
                        </div>
                        <div className='w-9/12 mx-auto py-2'>
                            <div className='flex pt-4'>
                                <div className='w-full mr-1'>
                                    <button
                                        type="button"
                                        onClick={formik.handleSubmit}
                                        className="block mx-auto w-full h-9 rounded bg-hardpurple-400 hover:bg-hardpurple-300 active:bg-hardpurple-300 text-white font-bold my-2 text-center"
                                    >
                                        Pagar {activeOptionInstallation.pricePerRange * rentHoursSelected.length} €
                                    </button>
                                </div>
                                <div className='w-full ml-1'>
                                    <button
                                        onClick={() => setIsOpenPayment(false)}
                                        className="block mx-auto w-full h-9 rounded bg-logo-500 hover:bg-logo-400
                                        active:bg-logo-400 text-white font-bold my-2 text-center"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </Transition>
    )
}
