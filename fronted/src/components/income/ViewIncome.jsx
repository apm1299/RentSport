import React from 'react'

export const ViewIncome = ({ incomes }) => {
    return (
        <div id='incomes' className='w-ful' >
            {
                incomes.length > 0
                    ? (
                        <div className='block overflow-y-auto h-96'>
                            {incomes.map((income, idx) => (
                                <div className='p-4 my-4 gap-4 ease-linear duration-300 bg-gray-100 hover:border-logo-500 border-2 border-gray-300 rounded'
                                    key={`${income.id}-${idx}`}
                                >
                                    <div>
                                        <h3 className='font-bold text-base border-b-2 border-hardpurple-300'>{income.date.substr(0, 9)}</h3>
                                    </div>
                                    <div className='flex flex-col gap-1 text-sm mt-2'>
                                        <div>
                                            <p>Realizada:</p><p> {income?.userMade?.name} {income?.userMade?.surnames}</p>
                                        </div>
                                        <div>
                                            <p>Ingresada a:</p><p> {income?.userReceived?.name} {income?.userReceived?.surnames}</p>
                                        </div>
                                        <div>
                                            <p>Cantidad:</p><p> {income?.quantity}€</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                    : (
                        <div className='ease-linear duration-300 hover:border-logo-500 border-2 border-gray-300 rounded p-4 my-4'>
                            <p>No hay Ingresos</p>
                        </div>
                    )
            }
        </div>
    )
}
