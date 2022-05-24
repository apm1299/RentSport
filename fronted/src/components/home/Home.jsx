import React, { useEffect, useState } from 'react'
import { getCenters } from '../../services/useCenter'
import notFound from '../../img/logo-color.png';
import useDebounce from "../../services/useDebounce"
import { Search } from './search/Search';
import { NavLink } from 'react-router-dom';

export const Home = () => {
    const [searchCenter, setSearch] = useState('');
    const debounce = useDebounce(searchCenter, 300)
    const [centers, setCenters] = useState([]);

    useEffect(() => {
        const callToGetCenters = async () => {
            setCenters(await getCenters());
        }
            callToGetCenters();
    }, []);
    useEffect(() => {
        if (debounce !== undefined) {
            const callToGetCenters = async () => {
                setCenters(await getCenters(debounce));
            }
            callToGetCenters();
        }
    }, [debounce]);
    return (
        <>
            <div className='bg-gray-100 py-10 min-h-screen'>
                <div id="separate" className='block lg:flex '>
                    <div id='separate1' className="block lg:w-8/12 w-11/12 b-8 mx-auto pt-4 bg-white px-12 rounded-3xl">
                        <Search setSearch={setSearch}/>
                        <div className="flex items-center border-b-2 border-logo-300 mb-2">
                            <h1 className="flex-1 text-xl italic font-medium">CENTROS DEPORTIVOS</h1>
                        </div>
                        <button className="ease-linear duration-300 h-9 rounded bg-logo-500 hover:bg-logo-400 active:bg-logo-300 w-full xl:w-4/12 2xl:w-3/12 text-white font-bold my-2 text-center "
                        >
                            Crear centro deportivo
                        </button>
                        <div id='centers' className='w-ful' >
                            {
                                centers.length > 0
                                    ? (
                                        <div className='block'>
                                            {centers.map((center, idx) => (
                                                <NavLink to={`/centro/${center.id}`} >
                                                    <div className='flex gap-4 ease-linear duration-300 hover:border-logo-500 border-2 border-gray-300 rounded p-4 my-4'
                                                        key={`${center.name}-${idx}`}
                                                    >
                                                        <div className='flex-none w-24 aspect-square pr-2 border-r-2 border-logo-500'>
                                                            <img src={notFound} alt={center.name} />
                                                        </div>
                                                        <div>
                                                            <h3 className='font-bold text-xl'>{center.name}</h3>
                                                            <h3>{center.locality}({center.province})</h3>
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )
                                    : (
                                        <div className='border-y-2 border-x-3 border-y-softblue-500 p-3 font-bold'>
                                            <p>No hay Centros Deportivos</p>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                    <div id='separate2' className='block lg:w-3/12 w-11/12 b-8 mx-auto pt-4 bg-white px-12 rounded-3xl'>
                        <div className="flex items-center border-b-2 border-logo-300 mb-2">
                            <h1 className="flex-1 text-xl italic font-medium">EVENTOS</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
