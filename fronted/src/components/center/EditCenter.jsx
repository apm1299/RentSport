import { useFormik } from "formik";
import * as Yup from "yup";

export const EditCenter = ({
    center,
    setIsOpenEditCenter,
}) => {
    const validation = Yup.object().shape({
        name: Yup.string()
            .max(255)
            .min(3)
            .required("Se requiere minimo 3 caracteres"),
        locality: Yup.string()
            .max(255)
            .min(3)
            .required("Se requiere minimo 3 caracteres"),
        province: Yup.string()
            .max(255)
            .min(3)
            .required("Se requiere minimo 3 caracteres"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            locality: "",
            province: "",
        },
        validationSchema: validation,
        onSubmit: (values) => {
            //update(id, values);
            formik.resetForm();
        },
    });

    return (
        <>
            <div className='m-6 rounded-2xl bg-gray-200'>
                <div className="text-center font-bold text-xl mt-4 mb-8">
                    <h1>Editar Centro</h1>
                </div>
                <div className="w-9/12 mx-auto mb-4">
                    <label
                        htmlFor="center-name"
                        className="block text-xl font-medium text-gray-700"
                    >
                        Nombre del centro
                    </label>
                    <div className="mt-1">
                        <input
                            {...formik.getFieldProps("name")}
                            required
                            placeholder="Nombre"
                            type="text"
                            id="name-center"
                            autoComplete="name-center"
                            className="py-3 px-4 block w-full shadow-sm focus:ring-softblue-600 rounded-md border-2 border-softblue-800"
                        />
                        {formik.getFieldMeta("name").error &&
                            formik.getFieldMeta("name").touched && (
                                <div className="text-xs text-red-500">
                                    {formik.getFieldMeta("name").error}
                                </div>
                            )}
                    </div>
                </div>
                <div className="w-9/12 mx-auto mb-4">
                    <label
                        htmlFor="center-province"
                        className="block text-xl font-medium text-gray-700"
                    >
                        Provincia
                    </label>
                    <div className="mt-1">
                        <input
                            {...formik.getFieldProps("province")}
                            required
                            placeholder="Provincia"
                            type="text"
                            id="province-center"
                            autoComplete="province-center"
                            className="py-3 px-4 block w-full shadow-sm focus:ring-softblue-600 rounded-md border-2 border-softblue-800"
                        />
                        {formik.getFieldMeta("province").error &&
                            formik.getFieldMeta("province").touched && (
                                <div className="text-xs text-red-500">
                                    {formik.getFieldMeta("province").error}
                                </div>
                            )}
                    </div>
                </div>
                <div className="w-9/12 mx-auto mb-4">
                    <label
                        htmlFor="center-locality"
                        className="block text-xl font-medium text-gray-700"
                    >
                        Localidad
                    </label>
                    <div className="mt-1">
                        <input
                            {...formik.getFieldProps("locality")}
                            required
                            placeholder="Localidad"
                            type="text"
                            id="locality-center"
                            autoComplete="locality-center"
                            className="py-3 px-4 block w-full shadow-sm focus:ring-softblue-600 rounded-md border-2 border-softblue-800"
                        />
                        {formik.getFieldMeta("locality").error &&
                            formik.getFieldMeta("locality").touched && (
                                <div className="text-xs text-red-500">
                                    {formik.getFieldMeta("locality").error}
                                </div>
                            )}
                    </div>
                </div>
                <div>
                    <div className='w-9/12 mx-auto py-2'>
                        <div className='block pt-4'>
                            <div className='w-full mr-1'>
                                <button
                                    type="button"
                                    onClick={formik.handleSubmit}
                                    className="block mx-auto w-full h-9 rounded bg-hardpurple-400 hover:bg-hardpurple-300 active:bg-hardpurple-300 text-white font-bold my-2 text-center"
                                >
                                    Actualizar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
