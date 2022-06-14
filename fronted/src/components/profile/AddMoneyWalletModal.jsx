import { Transition } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { FlagMessage } from "../commons/FlagMessage"

export const AddMoneyWalletModal = ({
    userLoggedIn,
    isOpenWallet,
    setIsOpenWallet,
    updateUser,
    setUserLoggedIn
}) => {
    const { showMessageSucess } = FlagMessage();
    const validation = Yup.object().shape({
        wallet: Yup.number()
      });
    
      const formik = useFormik({
        initialValues: {
          wallet: "",
        },
        validationSchema: validation,
        onSubmit: (values) => {
            updateUser(userLoggedIn.id, values);
            setUserLoggedIn(userLoggedIn=>({...userLoggedIn, wallet:values.wallet}));
            showMessageSucess("Transferencia realizada");
            setIsOpenWallet(false);
        },
      });
      const [moneyWallet, setMoneyWallet] = useState(userLoggedIn.wallet);

        useEffect(() => {
            const callToGetAddMoneyWallet = async () => {
                let sum = Number(moneyWallet) + Number(userLoggedIn.wallet);
                console.log(sum);
                formik.setFieldValue("wallet",sum);
            };
            callToGetAddMoneyWallet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [moneyWallet]);

        useEffect(() => {
            formik.setFieldValue("email",userLoggedIn.email)
            
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [userLoggedIn.email])
        
    return (
        <Transition show={isOpenWallet}>
            <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-10/12 lg:w-7/12 xl:w-6/12 my-6 mx-auto max-w-7xl rounded-l-lg h-5/6 overflow-y-auto">
                    <div className="pb-8 pt-8 border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="text-center font-bold text-3xl">
                            <h1>Ingresar</h1>
                        </div>
                        <div className='w-9/12 mx-auto py-2'>
                            <label className='text-lg tex'>
                                Introduzca cantidad a ingresar
                            </label>
                            <input
                                required
                                placeholder="Cantidad"
                                type="text"
                                id="wallet"
                                autoComplete="wallet"
                                className="py-3 px-4 block w-full shadow-sm focus:ring-logo-200 rounded-md border-2 border-hardpurple-300"
                                onChange={(e) => setMoneyWallet(e.target.value)}
                            />
                            {formik.getFieldMeta("wallet").error &&
                                formik.getFieldMeta("wallet").touched && (
                                    <div className="text-xs text-red-500">
                                        {formik.getFieldMeta("wallet").error}
                                    </div>
                                )}
                        </div>
                        <div className='w-9/12 mx-auto py-2'>
                            <div className='flex pt-4'>
                                <div className='w-full mr-1'>
                                    <button
                                        type="button"
                                        onClick={formik.handleSubmit}
                                        className="block mx-auto w-full h-9 rounded bg-hardpurple-400 hover:bg-hardpurple-300 active:bg-hardpurple-300 text-white font-bold my-2 text-center"
                                    >
                                        Ingresar
                                    </button>
                                </div>
                                <div className='w-full ml-1'>
                                    <button
                                        onClick={() => setIsOpenWallet(false)}
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
            <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </Transition>
    )
}
