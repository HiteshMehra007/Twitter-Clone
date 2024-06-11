import React from 'react'
import { Outlet } from "react-router-dom"
import LeftSidebar from './LeftSidebar'
import Feed from './Feed'
import RightSidebar from './RightSidebar'

export const Home = () => {
  return (
    <div className='home flex gap-2 justify-between w-[80%] mx-auto py-4'>
        <LeftSidebar />
        <Outlet />
        <RightSidebar />
    </div>
  )
}
