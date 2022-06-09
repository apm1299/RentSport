import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";

export const NewInstallation = ({
    setIsOpenEditCenter,
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
        <>
            <div className='m-6 rounded-2xl bg-gray-200'>
                <div className="text-center font-bold text-xl mt-4 mb-8">
                    <h1>Crear Instalacion</h1>
                </div>
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
                                Crear
                            </button>
                        </div>
                        <div className='w-full ml-1'>
                            <button
                                onClick={() => setIsOpenEditCenter(false)}
                                className="block mx-auto w-full h-9 rounded bg-logo-500 hover:bg-logo-400
                                        active:bg-logo-400 text-white font-bold my-2 text-center"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
