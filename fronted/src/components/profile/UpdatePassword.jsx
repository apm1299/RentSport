import React from 'react'
import { changePasswordInput } from './ChangeData'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { EnterUserPasswordModal } from '../auth/enterUserPasswordModal/EnterUserPasswordModal';
import { useChangePassword } from '../../services/useChangePassword';

export const UpdatePassword = ({
    userLoggedIn
}) => {
    const {
        isOpenEnterUserPasswordModal,
        setIsOpenEnterUserPasswordModal,
        updateUser
    } = useChangePassword();

    const schema = Yup.object().shape({
        newPassword: Yup.string().required("Este valor es requerido"),
        newPasswordRepit: Yup.string().when("newPassword", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("newPassword")],
                "Ambas contraseñas deben ser iguales."
            )
        })
    });

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            newPasswordRepit: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            setIsOpenEnterUserPasswordModal(true)
            formik.resetForm();
        }
    });
    return (
        <>
            <div id='divChangePassword' className='w-80 mx-auto mb-8' hidden>
                <label>Nueva contraseña</label>
                <input
                    {...formik.getFieldProps("newPassword")}
                    placeholder='Nueva contraseña'
                    required
                    type="password"
                    id="newPassword"
                    autoComplete="newPassword"
                    className="outline-none py-1 px-2 block w-full rounded-md border-2 border-logo-200"
                />
                {formik.getFieldMeta("newPassword").error
                    && formik.getFieldMeta("newPassword").touched
                    && (
                        <div className='text-xs text-red-500'>
                            {formik.getFieldMeta("newPassword").error}
                        </div>
                    )
                }
                <label>Repita Contraseña</label>
                <input
                    {...formik.getFieldProps("newPasswordRepit")}
                    placeholder='Repita contraseña'
                    required
                    type="password"
                    id="newPasswordRepit"
                    autoComplete="newPasswordRepit"
                    className="outline-none py-1 px-2 block w-full rounded-md border-2 border-logo-200"
                />
                {formik.getFieldMeta("newPasswordRepit").error
                    && formik.getFieldMeta("newPasswordRepit").touched
                    && (
                        <div className='text-xs text-red-500'>
                            {formik.getFieldMeta("newPasswordRepit").error}
                        </div>
                    )
                }
                <button
                    type="button"
                    className="w-full text-center my-4 bg-logo-300 hover:bg-logo-400 ease-linear duration-300 py-1 px-2 rounded"
                    onClick={formik.handleSubmit}
                >
                    Actualizar Contraseña
                </button>
                <EnterUserPasswordModal
                    userLoggedIn={userLoggedIn}
                    isOpenEnterUserPasswordModal={isOpenEnterUserPasswordModal}
                    setIsOpenEnterUserPasswordModal={setIsOpenEnterUserPasswordModal}
                    updateUser={updateUser}
                />
            </div>
        </>
    )
}
