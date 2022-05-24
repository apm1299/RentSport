import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from './navBar/NavBar'
import { Profile } from './profile/Profile'

export const Layout = () => {

  return (
    <div>
      <NavBar />
      <div className="flex-1 bg-gray-100 xl:flex">
        <div className="flex-grow w-full mx-auto block xl:flex">
        <Profile />
          <div className="bg-white flex-grow overflow-hidden">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}
