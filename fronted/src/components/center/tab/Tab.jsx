import React, { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { Calendar } from "react-calendar";
import styled from 'styled-components';
import { getSports } from '../../../services/useSport';

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
    flex-grow: 0.333;
  }
}
    /* ~~~ label styles ~~~ */
    .react-calendar__month-view__weekdays {
        text-align: center;
    }
  /* ~~~ button styles ~~~ */
  button {
    margin: 3px;
    background-color: #194473;
    border: 0;
    border-radius: 3px;
    color: white;
    padding: 5px 0;

    &:hover {
      background-color: #47698f;
    }

    &:active {
      background-color: #0f2945;
    }
    button:focus {
        background-color: #0f2945;
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
      box-shadow: 0 0 6px 2px black;
      background-color: #14365c;

  }
  /* ~~~ neighboring month & weekend styles ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.7;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #dfdfdf;

  }
`;

export const MyTab = () => {
  const [sports, setSport] = useState([]);

  useEffect(() => {
    const callToGetSport = async () => {
      setSport(await getSports());
    }
    callToGetSport();

  }, []);
  return (
    <>
      <Tab.Group>
        <Tab.List className={'w-8/12 mx-auto mt-4'}>
          <Tab className={({ selected }) =>
            selected ? 'w-6/12 bg-logo-500 hover:bg-logo-400 h-8 text-white font-bold rounded-3xl' : 'w-6/12 bg-logo-400 hover:bg-logo-400 h-8 text-white font-bold rounded-3xl'}>
            Alquilar
          </Tab>
          <Tab className={({ selected }) =>
            selected ? 'w-6/12 bg-logo-500 hover:bg-logo-400 h-8 text-white font-bold rounded-3xl' : 'w-6/12 bg-logo-400 hover:bg-logo-400 h-8 text-white font-bold rounded-3xl'}>
            Eventos
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div>
              <div className='flex pt-6'>
                <div className='w-6/12'>
                  <h1 className='text-center font-bold text-xl'>Calendario</h1>
                  <CalendarContainer>
                    <Calendar />
                  </CalendarContainer>
                </div>
                <div className='w-5/12'>
                  <h1 className='text-center font-bold text-xl'>SELECT DEPORTES</h1>
                  {
                    sports.length > 0
                      ? (
                        <select id="select-sports" className='mt-8 bg-white py-3 px-4 block w-full shadow-sm border-2 border-softblue-800 rounded-md'>
                          {sports.map((sport, idx) => (
                            <option key={`${sport.name}-${idx}`} value={sport.id}>{sport.name}</option>
                          ))}
                        </select>

                      )
                      : (
                        <div className='bg-white py-3 px-4 block w-full shadow-sm border-2 border-softblue-800 rounded-md'>
                          <p>Sin proyectos asignados</p>
                        </div>
                      )
                  }

                </div>
              </div>
              <div>

              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}
