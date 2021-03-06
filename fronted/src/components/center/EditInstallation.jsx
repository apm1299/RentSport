import React, { useEffect } from "react";
import { FormikContext, useFormik } from "formik";
import * as Yup from "yup";
import { useSport } from "../../services/useSport";
import { CheckPicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useInstallation } from "../../services/useInstallation";
import { Transition } from "@headlessui/react";
import { FlagMessage } from "../commons/FlagMessage";

export const EditInstallation = ({
    isOpenEditInstallation,
    setIsOpenEditInstallation,
    installation,
    center,
    setInstallation
}) => {
    const { editInstallation } = useInstallation();
    const { sports } = useSport();
    const { showMessageSucess } = FlagMessage()
    
    const validateDay = Yup.array().of(
        Yup.object({
            id: Yup.string().required(),
            startAt: Yup.string().required(),
            endAt: Yup.string().required(),
        }).test("is-threshold-valid", "", function (item) {
            const array = this.parent;
            const index = parseInt(this.path.split("[")[1].split("]")[0], 10);
            const prevIndex = index - 1;
            const prev = array[prevIndex];

            if (prev) {
                const startAtCondition =
                    prev.endAt <= item.startAt && prev.startAt < item.startAt;
                const endAtCondition = item.startAt < item.endAt;

                return startAtCondition && endAtCondition
                    ? true
                    : this.createError({
                        path: `${this.path}`,
                        message: `Las hora de comienzo debe de ser mayor que la ultima hora de fin y la hora de fin mayor que la hora de comienzo`,
                    });
            } else {
                const endAtCondition = item.startAt < item.endAt;

                return endAtCondition
                    ? true
                    : this.createError({
                        path: `${this.path}`,
                        message: `La hora de fin debe ser mayor que ${item.startAt}`,
                    });
            }
        })
    );

    const validation = Yup.object().shape({
        name: Yup.string()
            .max(255)
            .min(3)
            .required("Se requiere minimo 3 caracteres"),
        schedule: Yup.object().shape({
            lunes: validateDay,
            martes: validateDay,
            miercoles: validateDay,
            jueves: validateDay,
            viernes: validateDay,
            sabado: validateDay,
            domingo: validateDay,
        }),
    });

    const days = [
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado",
        "domingo",
    ];

    const formik = useFormik({
        initialValues: {
            center: `/api/centers/${center.id}`,
            name: installation.name,
            sports: installation.sports,
            schedule: installation.schedule,
            pricePerRange: installation.pricePerRange,
        },
        validationSchema: validation,
        onSubmit: (values) => {
            editInstallation(installation.id,values);
            setInstallation(installation => ({ ...installation, name: values.name }));
            setInstallation(installation => ({ ...installation, sports: values.sports }));
            setInstallation(installation => ({ ...installation, schedule: values.schedule }));
            setInstallation(installation => ({ ...installation, pricePerRange: values.pricePerRange }));
            setIsOpenEditInstallation(false);
            showMessageSucess("Datos guardados");
        },
    });
    useEffect(() => {
        formik.resetForm();
    }, [installation])
    
    return (
        <Transition
            show={isOpenEditInstallation}
        >
            <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-10/12 lg:w-7/12 xl:w-6/12 my-6 mx-auto max-w-7xl rounded-l-lg h-5/6 overflow-y-auto">
                    <div className="pb-8 pt-8 border-0 shadow-lg relative flex flex-col w-full bg-hardpurple-200 outline-none focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 postition absolute right-6 text-hardpurple-300 hover:text-hardpurple-500 ease-linear duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            onClick={() => setIsOpenEditInstallation(false)}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        <div className="text-center font-bold text-3xl text-hardpurple-500 shadow-xl">
                            <h1>{center.name}</h1>
                        </div>
                        <div className="m-6 rounded-2xl bg-gray-200">
                            <div className="text-center font-bold text-xl mt-4 mb-8">
                                <h1>Editar Instalacion {installation.name}</h1>
                            </div>
                            <div className="w-9/12 mx-auto py-2">
                                <label
                                    htmlFor="name"
                                    className="block text-xl font-medium text-gray-700"
                                >
                                    Nombre instalacion
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
                            <div className="w-9/12 mx-auto py-2">
                                <label
                                    htmlFor="pricePerRange"
                                    className="block text-xl font-medium text-gray-700"
                                >
                                    Precio por rango
                                </label>
                                <div className="mt-1">
                                    <input
                                        {...formik.getFieldProps("pricePerRange")}
                                        required
                                        placeholder="Precio por rango"
                                        type="decimal"
                                        id="pricePerRange"
                                        autoComplete="pricePerRange"
                                        className="outline-none py-3 px-4 block w-full shadow-sm rounded-md ring-1 ring-hardpurple-200 focus:ring-2 focus:ring-hardpurple-300"
                                        onInput={(e) => {
                                            const value = parseInt(e.target.value);
                                            e.target.value = value ? value : null
                                        }}
                                    />
                                    {formik.getFieldMeta("pricePerRange").error &&
                                        formik.getFieldMeta("pricePerRange").touched && (
                                            <div className="text-xs text-red-500">
                                                {formik.getFieldMeta("pricePerRange").error}
                                            </div>
                                        )}
                                </div>
                            </div>

                            <div className="w-9/12 mx-auto py-2">
                                <label
                                    htmlFor="sports"
                                    className="block text-xl font-medium text-gray-700"
                                >
                                    Deportes disponibles
                                </label>
                                {sports.length > 0 && (
                                    <CheckPicker data={sports}
                                        className="outline-none ring-1 ring-hardpurple-200 focus:ring-2 focus:ring-hardpurple-300 rounded-md"
                                        block
                                        labelKey="name"
                                        valueKey="@id"
                                        sticky
                                        onChange={(value) =>
                                            formik.setFieldValue(`sports`, value)
                                        }

                                    />
                                )}

                            </div>

                            <div className="w-9/12 mx-auto py-2">
                                <label
                                    htmlFor="hoursRental"
                                    className="block text-xl font-medium text-gray-700"
                                >
                                    Tramo de alquiler
                                </label>
                                <div className="gap-2 flex flex-col">
                                    {days.map((day) => (
                                        <div key={day} className="border">
                                            <div className="py-1 border ">
                                                <h2 className="text-lg font-semibold">{day}</h2>
                                            </div>
                                            <div className="gap-2 flex flex-col">
                                                <div>
                                                    {formik
                                                        .getFieldProps(`schedule.${day}`)
                                                        ?.value?.map((scheduleDayRange, idx) => (
                                                            <div>
                                                                <div className="gap-2 flex items-center">
                                                                    <div className="flex-grow">
                                                                        <input
                                                                            type="time"
                                                                            className="outline-none w-full py-2 px-2 border border-hardpurple-400"
                                                                            {...formik.getFieldProps(
                                                                                `schedule.${day}.${idx}.startAt`
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <div className="flex-grow">
                                                                        <input
                                                                            type="time"
                                                                            className="outline-none w-full py-2 px-2 border border-hardpurple-400"
                                                                            {...formik.getFieldProps(
                                                                                `schedule.${day}.${idx}.endAt`
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <div className="flex-none">
                                                                        <button
                                                                            className="p-2 text-red-500"
                                                                            onClick={() => {
                                                                                let newArray = formik.getFieldProps(
                                                                                    `schedule.${day}`
                                                                                )?.value;
                                                                                newArray.splice(idx, 1);
                                                                                formik.setFieldValue(
                                                                                    `schedule.${day}`,
                                                                                    newArray
                                                                                );
                                                                            }}
                                                                        >
                                                                            x
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="text-red-500">
                                                                    {typeof formik.getFieldMeta(
                                                                        `schedule.${day}.${idx}`
                                                                    ).error === "string"
                                                                        ? formik.getFieldMeta(`schedule.${day}.${idx}`)
                                                                            .error
                                                                        : ""}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    <div className="text-red-500">
                                                        {typeof formik.getFieldMeta(`schedule.${day}`).error ===
                                                            "string"
                                                            ? formik.getFieldMeta(`schedule.${day}`).error
                                                            : ""}
                                                    </div>
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => {
                                                            formik.setFieldValue(`schedule.${day}`, [
                                                                ...formik.getFieldProps(`schedule.${day}`)?.value,
                                                                {
                                                                    id: uuidv4(),
                                                                    startAt: null,
                                                                    endAt: null,
                                                                },
                                                            ]);
                                                        }}
                                                        type="button"
                                                        className="px-2 py-1 bg-hardpurple-400 text-white text-sm font-semibold rounded "
                                                    >
                                                        A??adir rango
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
                                            Confirmar
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
            </div>
            <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </Transition>
    )
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}