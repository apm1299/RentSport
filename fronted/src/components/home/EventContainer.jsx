import React from 'react'
import { useEvent } from '../../services/useEvent'

export const EventContainer = () => {
    const { events } = useEvent();
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
        <div id='events' className='w-ful' >
            {
                events.length > 0
                    ? (
                        <div className='block'>
                            {events.map((event, idx) => (
                                <div className='p-4 my-4 gap-4 ease-linear duration-300 bg-gray-100 hover:border-logo-500 border-2 border-gray-300 rounded'
                                    key={`${event.id}-${idx}`}
                                >
                                    <div>
                                        <h3 className='font-bold text-lg border-b-2 border-hardpurple-300'>{event.installation.center.name}</h3>
                                    </div>
                                    <div className='flex-grow text-base mt-2'>
                                        <p>Deporte: {event.sport.name}</p>
                                        <p>Dia:  
                                            {
                                                isNaN(event.date.substr(5, 2)) ? (
                                                    ` ${event.date.substr(7, 2)} de ${month[Number(event.date.substr(5, 1)) - 1]} del ${event.date.substr(0, 4)}`
                                                ) : (
                                                    ` ${event.date.substr(8, 2)} de ${month[Number(event.date.substr(5, 2)) - 1]} del ${event.date.substr(0, 4)}`
                                                )
                                            }
                                        </p>
                                        <p>Intalacion {event.installation.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                    : (
                        <div className='ease-linear duration-300 hover:border-logo-500 border-2 border-gray-300 rounded p-4 my-4'>
                            <p>No hay Eventos</p>
                        </div>
                    )
            }
        </div>
    )
}
