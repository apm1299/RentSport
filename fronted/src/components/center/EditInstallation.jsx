import { Transition } from '@headlessui/react'
import { useFormik } from "formik";
import * as Yup from "yup";

export const EditInstallation = ({
    isOpenEditInstallation,
    setIsOpenEditInstallation,
    activeOptionInstallation,
}) => {

    const validation = Yup.object().shape({

    });

    const formik = useFormik({
        initialValues: {
            name: "",
            schedure: "",
            pricePerRange: "",
        },
        validationSchema: validation,
        onSubmit: (values) => {
           // update(activeOptionInstallation,values);
        }
    });

    return (
        <Transition
            show={isOpenEditInstallation}
        >
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-10/12 lg:w-5/12 xl:w-4/12 my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="pb-8 pt-8 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className='w-9/12 mx-auto py-2'>
                            <label htmlFor="name" className="block text-xl font-medium text-gray-700">
                                Nombre instalacion
                            </label>
                            <div className="mt-1">
                                <input
                                    {...formik.getFieldProps("name")}
                                    required
                                    placeholder='Nombre'
                                    type="text"
                                    id="name"
                                    autoComplete="name"
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-softblue-600 rounded-md border-2 border-softblue-800"
                                />
                                {formik.getFieldMeta("name").error
                                    && formik.getFieldMeta("name").touched
                                        && (
                                            <div className='text-xs text-red-500'>
                                                {formik.getFieldMeta("name").error}
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                        <div className='w-9/12 mx-auto py-2'>
                            <label htmlFor="pricePerRange" className="block text-xl font-medium text-gray-700">
                                Precio por rango
                            </label>
                            <div className="mt-1">
                                <input
                                    {...formik.getFieldProps("pricePerRange")}
                                    required
                                    placeholder='Precio por rango'
                                    type="decimal"
                                    id="pricePerRange"
                                    autoComplete="pricePerRange"
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-softblue-600 rounded-md border-2 border-softblue-800"
                                />
                                {formik.getFieldMeta("pricePerRange").error
                                    && formik.getFieldMeta("pricePerRange").touched
                                        && (
                                            <div className='text-xs text-red-500'>
                                                {formik.getFieldMeta("pricePerRange").error}
                                            </div>
                                        )
                                }
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
                                        Actualizar
                                    </button>
                                </div>
                                <div className='w-full ml-1'>
                                    <button
                                        onClick={() => setIsOpenEditInstallation(false)}
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
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </Transition>
    )
}

