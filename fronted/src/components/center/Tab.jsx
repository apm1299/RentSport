import React from 'react'
import { Tab } from '@headlessui/react'

import { RentTab } from './RentTab';

export const MyTab = ({
  center,
}) => {

  return (
    <>
      {
        center && (

          <Tab.Group>
            <Tab.List className={'w-6/12 mx-auto mt-4'}>
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
                <RentTab
                  center={center}
                />
              </Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        )
      }
    </>
  )
}
