import React, { useEffect, useState } from 'react'
import { useEvent } from '../../services/useEvent'

export const EventTab = ({ center }) => {

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

    const { getEventsCenter } = useEvent();

    const [eventsCenter, setEventsCenter] = useState([]);

    useEffect(() => {
        const callToGetCenters = async () => {
            setEventsCenter(await getEventsCenter(center.id));
        }
        callToGetCenters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [center]);
    return (
        <div id='events' className='w-ful' >
            {
                eventsCenter.length > 0
                    ? (
                        <div className='block'>
                            {eventsCenter.map((event, idx) => (
                                <div className='p-4 my-4 w-11/12 mx-auto gap-4 ease-linear duration-300 bg-hardpurple-100 hover:border-hardpurple-400 hover:bg-gray-200 border-2 border-hardpurple-300 text-black rounded'
                                    key={`${event.id}-${idx}`}
                                >
                                    <div>
                                        <h3 className='font-bold text-lg border-b-2 border-hardpurple-300'>{event.installation.name}</h3>
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                    : (
                        <div className='p-4 my-4 w-11/12 mx-auto gap-4 ease-linear duration-300 bg-hardpurple-100 hover:border-hardpurple-400 hover:bg-gray-200 border-2 border-hardpurple-300 text-black rounded'>
                            <p>Este centro no tiene eventos</p>
                        </div>
                    )
            }
        </div>
    )
}
