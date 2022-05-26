import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from './navBar/NavBar'

export const Layout = () => {

  return (
    <div>
      <NavBar />
        <div className="flex-grow w-full mx-auto block xl:flex">
          <div className="bg-white flex-grow overflow-hidden">
            <Outlet/>
          </div>
        </div>
    </div>
  )
}
