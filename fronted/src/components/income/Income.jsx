import React from 'react'
import { useIncome } from '../../services/useIncome';
import { AddIncome } from './AddIncome'
import { ViewIncome } from './ViewIncome'

export const Income = () => {

    const { incomes } = useIncome();

  return (
    <div className='bg-hardpurple-100 '>
                <div className=' py-10 min-h-screen bg-gradient-to-b from-hardpurple-400 via-hardpurple-100 to-hardpurple-400'>
                    <div id="separate" className='block lg:flex '>
                        <div id='separate1' className="block lg:w-8/12 w-11/12 b-8 mx-auto pt-4 bg-gray-50 border-4 border-logo-500 px-12 rounded-3xl shadow-2xl">
                            <div className="flex items-center border-b-2 border-logo-300 mb-2">
                                <h1 className="flex-1 text-xl italic font-medium">Nuevo Ingreso</h1>
                            </div>
                            <AddIncome/>
                        </div>
                        <div id='separate2' className='px-8 block lg:w-3/12 w-11/12 b-8 mx-auto pt-4 bg-gray-50 border-4 border-logo-500 rounded-3xl shadow-2xl'>
                            <div className="flex items-center border-b-2 border-logo-300 mb-2">
                                <h1 className="flex-1 text-xl italic font-medium">Ingresos Realizados</h1>
                            </div>
                            <ViewIncome
                                incomes={incomes}
                            />
                        </div>
                    </div>
                </div>
            </div>
  )
}
