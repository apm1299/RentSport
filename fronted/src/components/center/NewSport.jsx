import React, { useState } from 'react'
import { NewSportModal } from './NewSportModal';

export const NewSport = () => {
    const [isOpenNewSport, setIsOpenNewSport] = useState(false);

  return (
    <div>
        <NewSportModal
            isOpenNewSport={isOpenNewSport}
            setIsOpenNewSport={setIsOpenNewSport}
        />
        <button className='p-2 w-11/12 bg-hardorange-500 hover:bg-hardorange-400 ease-linear duration-300 font-semibold rounded float-right'
            onClick={()=> setIsOpenNewSport(true)}
        >
            Otro deporte
        </button>
    </div>
  )
}
