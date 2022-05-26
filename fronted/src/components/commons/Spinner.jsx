import { Transition } from '@headlessui/react'
import React from 'react'
import { SpinnerDotted } from 'spinners-react'

export const Spinner = () => {
  return (
    <>
      <Transition
        show={true}
      >
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <SpinnerDotted size={76} thickness={140} speed={100} color="rgba(80, 51, 107, 1)" />
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </Transition>
    </>
  )
}
