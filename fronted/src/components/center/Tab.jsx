import React from 'react'
import { Tab } from '@headlessui/react'

import { RentTab } from './RentTab';
import { EventTab } from './EventTab';

export const MyTab = ({
  center,
}) => {

  return (
    <>
      {
        center && (

          <Tab.Group>
            <Tab.List className={'w-5/12 mx-auto mt-4'}>
              <Tab className={({ selected }) =>
                selected ? 'outline-none ease-linear duration-300 w-6/12 border-b-4 border-logo-400 h-8 text-logo-400 font-bold rounded-3xl' : 'outline-none ease-linear duration-300 w-6/12 border-b-4 border-logo-200 h-8 text-logo-400 font-bold rounded-3xl'}>
                Alquilar
              </Tab>
              <Tab className={({ selected }) =>
                selected ? 'outline-none ease-linear duration-300 w-6/12 border-b-4 border-logo-400 h-8 text-logo-400 font-bold rounded-3xl' : 'outline-none ease-linear duration-300 w-6/12 border-b-4 border-logo-200 h-8 text-logo-400 font-bold rounded-3xl'}>
                Eventos
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <RentTab
                  center={center}
                />
              </Tab.Panel>
              <Tab.Panel>
                <EventTab
                  center={center}
                />
               </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        )
      }
    </>
  )
}
