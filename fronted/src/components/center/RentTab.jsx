import React, { useEffect, useMemo, useState } from 'react'
import { Calendar } from "react-calendar";
import styled from 'styled-components';
import { useInstallation } from '../../services/useInstallation';

const CalendarContainer = styled.div`
/* ~~~ container styles ~~~ */
max-width: 95%;
margin: auto;
margin-top: 20px;
padding: 10px;
border-radius: 3px;
/* ~~~ navigation styles ~~~ */
.react-calendar__navigation {
  display: flex;

  .react-calendar__navigation__label {
    font-weight: bold;
  }

  .react-calendar__navigation__arrow {
    flex-grow: 0.433;
  }
}
    /* ~~~ label styles ~~~ */
    .react-calendar__month-view__weekdays {
        text-align: center;
    }
  /* ~~~ button styles ~~~ */
  button {
    margin: 3px;
    background-color: #50336b;
    border: 0;
    font-weight: bold;
    border-radius: 22px;
    color: #ffb133;
    padding: 5px 0;

    &:hover {
      background-color: #7c6690;
      color: #ff9e00;
    }

    &:active {
      background-color: #ffb133;
      color: #50336b;
    }
    button:focus {
        background-color: #ffb133;
        color: #50336b;
    }
  }
  /* ~~~ day grid styles ~~~ */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%; 

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
  /* ~~~ active day styles ~~~ */
  .react-calendar__tile--range {
      box-shadow: 0 0 14px 2px black;
      background-color: #ffb133;
      color: #50336b;
  }

  /* ~~~ neighboring month & weekend styles ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.6;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #ffb133;
  }
`;

export const RentTab = ({
    center
}) => {

    const {
        //getRentDates,
        getInstallation,
        getInstalationsSport,
    } = useInstallation()

    //Guarda el id del deporte (option) seleccionado
    const [activeOption, setActiveOption] = useState([])
    //Guarda el id de la instalacion (option) seleccionado
    const [activeOptionInstallation, setActiveOptionInstallation] = useState([])

    const [installation, setInstallation] = useState([])
    useEffect(() => {
        const callToGetCustomers = async () => {
            setInstallation(await getInstallation(activeOptionInstallation));
        }
        callToGetCustomers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeOptionInstallation]);


    const [installationsSport, setInstallationsSport] = useState([])
    useEffect(() => {
        const callToGetCustomers = async () => {
            setInstallationsSport(await getInstalationsSport(center.id, activeOption));
        }
        callToGetCustomers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeOption]);

    //COMPRUEBA QUE ME DEVUELVA UN ARRAY, EN EL CASO DE DEVOLVERME OBJETO LO CONVIERTE EN ARRAY
    const sports = useMemo(() => {
        if (center.sports) {
            return typeof center.sports === 'object'
                ? Object.keys(center.sports).map(key => center.sports[key])
                : center.sports
        }
        return []
    }, [center.sports])

    return (
        <div>
            <div className='pt-6 w-10/12 mx-auto'>
                <h1 className='text-center font-bold text-xl'>Calendario</h1>
                <CalendarContainer>
                    <Calendar />
                </CalendarContainer>
                <div className='pt-6 w-10/12 mx-auto'>
                    <h1 className='text-center font-bold text-xl'>SELECT DEPORTES</h1>
                    {
                        sports?.length > 0
                            ? (
                                <select
                                    id="select-sports"
                                    className='mt-8 bg-white py-3 px-4 block w-full shadow-sm border-2 border-softblue-800 rounded-md'
                                >
                                    <option
                                        className='text-gray-500'
                                        selected='selected'
                                        onClick={() => setActiveOption()}
                                        value={0}>
                                        Todos los deportes
                                    </option>
                                    {sports.map((sport, idx) => (
                                        <option
                                            onClick={() => setActiveOption(sport.id)}
                                            key={`${sport.name}-${idx}`}
                                            value={sport.id}>{sport.name}
                                        </option>
                                    ))}
                                </select>
                            )
                            : (
                                <div className='bg-white py-3 px-4 block w-full shadow-sm border-2 border-softblue-800 rounded-md'>
                                    <p>Sin deportes asignados</p>
                                </div>
                            )
                    }
                </div>
                <div className='pt-6 w-10/12 mx-auto'>
                    <h1 className='text-center font-bold text-xl'>SELECT PISTA</h1>
                    {
                        installationsSport.length > 0
                            ? (
                                <select id="select-project"
                                    className='mt-8 bg-white py-3 px-4 block w-full shadow-sm border-2 border-softblue-800 rounded-md'
                                    placeholder='Seleccione proyecto'
                                >
                                    <option
                                        className='text-gray-500'
                                        selected='selected'
                                        value={0}>
                                        Selecciona la pista
                                    </option>
                                    {installationsSport.map((installation, idx) => (
                                        <option
                                           onClick={() => setActiveOptionInstallation(installation.id)}
                                            key={`${installation.name}-${idx}`}
                                            value={installation?.['@id']}
                                        >
                                            {installation.name}
                                        </option>
                                    ))}
                                </select>
                            )
                            : (
                                <div className='bg-white py-3 px-4 block w-full shadow-sm border-2 border-softblue-800 rounded-md'>
                                    <p>No hay ninguna pista disponible</p>
                                </div>
                            )
                    }
                </div>
                <div className='pt-6 w-10/12 mx-auto'>
                    <h1 className='text-center font-bold text-xl'>HORAS DISPONIBLES</h1>
                    {
                        installation
                        ? (
                            console.log(installation),
                            'wi'
                        ):
                        (
                            console.log(installation),
                            'no'
                        )
                    }
                </div>
            </div>
        </div>
    )
}
