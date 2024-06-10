import React from 'react'
import { CiSearch } from "react-icons/ci";

const RightSidebar = () => {
  return (
    <div className='right-sidebar w-[20%]'>
      <div className='search-bar flex items-center p-2 bg-gray-100 rounded-full'>
        <CiSearch size="20px" />
        <input className='px-2 outline-none bg-transparent' type="text" placeholder='Search' />
      </div>
    </div>
  )
}

export default RightSidebar