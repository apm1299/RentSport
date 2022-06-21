import { Transition } from '@headlessui/react'
import React from 'react'
import { useFormik } from "formik";
import { FlagMessage } from '../commons/FlagMessage';
import { useSport } from '../../services/useSport';


export const NewSportModal = ({
  isOpenNewSport,
  setIsOpenNewSport,
}) => {

  const { createSport } = useSport()
  const { showMessageSucess, showMessageError } = FlagMessage()
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      createSport(values);
      setIsOpenNewSport(false);
      showMessageSucess("Deporte añadido");

    },
  });
  return (
    <Transition show={isOpenNewSport}>
      <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-10/12 lg:w-7/12 xl:w-6/12 my-6 mx-auto max-w-7xl rounded-l-lg h-5/6 overflow-y-auto">
          <div className="pb-8 pt-8 border-0 shadow-lg relative flex flex-col w-8/12 mx-auto bg-hardpurple-200 outline-none focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 postition absolute right-6 text-hardpurple-300 hover:text-hardpurple-500 ease-linear duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              onClick={() => setIsOpenNewSport(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div className="text-center font-bold text-3xl text-hardpurple-500 shadow-xl">
              <h1>Nuevo deporte</h1>
            </div>
            <div className='m-6 rounded-2xl bg-gray-200'>
              <div className="w-9/12 mx-auto py-8">
                <label
                  htmlFor="name"
                  className="block text-xl font-medium text-gray-700"
                >
                  Nombre del nuevo deporte
                </label>
                <div className="mt-1">
                  <input
                    {...formik.getFieldProps("name")}
                    required
                    placeholder="Nombre"
                    type="text"
                    id="name"
                    autoComplete="name"
                    className="outline-none py-3 px-4 block w-full shadow-sm rounded-md ring-1 ring-hardpurple-200 focus:ring-2 focus:ring-hardpurple-300"
                  />
                  {formik.getFieldMeta("name").error &&
                    formik.getFieldMeta("name").touched && (
                      <div className="text-xs text-red-500">
                        {formik.getFieldMeta("name").error}
                      </div>
                    )}
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
                      Añadir
                    </button>
                  </div>
                  <div className='w-full ml-1'>
                    <button
                      onClick={() => 
                        setIsOpenNewSport(false)
                      }
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
      </div>
      <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
    </Transition>
  )
}
