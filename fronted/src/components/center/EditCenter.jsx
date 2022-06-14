import { useFormik } from "formik";
import * as Yup from "yup";
import { useCenter } from "../../services/useCenter";
import { FlagMessage } from "../commons/FlagMessage"
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";
import { useEffect, useState } from "react";

export const EditCenter = ({
    center,
    setCenter,
    setIsOpenEditCenter,
}) => {

    const uploader = new Uploader({
        // Get production API keys from Upload.io
        apiKey: "free",
    });
    const [newImg, setNewImg] = useState([]);
    useEffect(() => {
        const callToGetProjectsUser = async () => {
            formik.setFieldValue("image", newImg[0].fileUrl);
            document.getElementById("imageSrc").src = newImg[0].fileUrl;
        };
        callToGetProjectsUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newImg]);

    const { showMessageSucess } = FlagMessage()
    const { updateCenter } = useCenter();

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
            name: center.name,
            locality: center.locality,
            province: center.province,
            image: "",
        },
        validationSchema: validation,
        onSubmit: (values) => {
            updateCenter(center.id, values);
            setCenter(center => ({ ...center, name: values.name }));
            setCenter(center => ({ ...center, locality: values.locality }));
            setCenter(center => ({ ...center, province: values.province }));
            setCenter(center => ({ ...center, image: values.image }));
            showMessageSucess("Datos guardados");
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
                            className="outline-none py-3 px-4 block w-full shadow-sm focus:ring-softblue-600 rounded-md ring-1 ring-hardpurple-200 focus:ring-2 focus:ring-hardpurple-300"
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
                            className="outline-none py-3 px-4 block w-full shadow-sm focus:ring-softblue-600 rounded-md ring-1 ring-hardpurple-200 focus:ring-2 focus:ring-hardpurple-300"
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
                            className="outline-none py-3 px-4 block w-full shadow-sm focus:ring-softblue-600 rounded-md ring-1 ring-hardpurple-200 focus:ring-2 focus:ring-hardpurple-300"
                        />
                        {formik.getFieldMeta("locality").error &&
                            formik.getFieldMeta("locality").touched && (
                                <div className="text-xs text-red-500">
                                    {formik.getFieldMeta("locality").error}
                                </div>
                            )}
                    </div>
                </div>
                <div className="w-9/12 mx-auto mb-4">
                    <img id='imageSrc'
                        className='w-32 h-32 mx-auto rounded-full border-solid border-2 border-hardpurple-300 shadow-2xl'
                        src={center.image ? center.image : 'https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png'}
                        alt=''
                    />
                    <div id=''>
                        <UploadButton
                            uploader={uploader}
                            options={{ multi: false }}
                            onComplete={(file) => setNewImg(file)}
                        >
                            {({ onClick }) => (
                                <button
                                    className="py-1 px-2 my-6 w-full bg-hardpurple-200 hover:bg-hardpurple-300 ease-linear duration-300 rounded-lg text-center text-white text-base font-semibold shadow-2xl"
                                    onClick={onClick}
                                >
                                    Cambiar imagen
                                </button>
                            )}
                        </UploadButton>
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
