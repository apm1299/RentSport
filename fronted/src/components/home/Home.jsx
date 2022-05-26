import React from 'react'
import { useCenter } from '../../services/useCenter'
import { Search } from './search/Search';
import { ButtonDefault } from '../commons/ButtonDefault';
import { CenterContainer } from '../center/CentersContainer';

export const Home = () => {

    const {
        setSearch,
        centers,
    } = useCenter()

    return (
        <>
            <div className='bg-hardpurple-100 '>
                <div className=' py-10 min-h-screen bg-gradient-to-b from-hardpurple-400 via-hardpurple-100 to-hardpurple-400'>
                    <div id="separate" className='block lg:flex '>
                        <div id='separate1' className="block lg:w-8/12 w-11/12 b-8 mx-auto pt-4 bg-white border-4 border-logo-500 px-12 rounded-3xl">
                            <Search setSearch={setSearch} />
                            <div className="flex items-center border-b-2 border-logo-300 mb-2">
                                <h1 className="flex-1 text-xl italic font-medium">CENTROS DEPORTIVOS</h1>
                            </div>
                            <ButtonDefault>Crear centro deportivo</ButtonDefault>
                            <CenterContainer
                                centers={centers}
                            />
                        </div>
                        <div id='separate2' className='block lg:w-3/12 w-11/12 b-8 mx-auto pt-4 bg-white px-12 rounded-3xl'>
                            <div className="flex items-center border-b-2 border-logo-300 mb-2">
                                <h1 className="flex-1 text-xl italic font-medium">EVENTOS</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}