import React from 'react'
import {images} from "../constants";
import { IoHome } from "react-icons/io5";
import { GoHash } from "react-icons/go";
import { MdNotificationsNone } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <div className='left-sidebar w-[20%]'>
      <div className="logo px-4">
        <img width={"40px"} src={images.twitter} alt="twitter-logo" />
      </div>
      <div className='sub-menu my-4'>
        <Link to="/" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
          <IoHome size={"24px"}/>
          <h1 className='font-bold text-lg mx-2'>Home</h1>
        </Link>
        <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
          <GoHash size={"24px"}/>
          <h1 className='font-semibold text-lg mx-2'>Explore</h1>
        </div>
        <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
          <MdNotificationsNone size={"24px"}/>
          <h1 className='font-semibold text-lg mx-2'>Notifications</h1>
        </div>
        <Link to="/profile" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
          <FaRegUser size={"24px"}/>
          <h1 className='font-semibold text-lg mx-2'>Profile</h1>
        </Link>
        <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
          <FaRegBookmark size={"24px"}/>
          <h1 className='font-semibold text-lg mx-2'>Bookmarks</h1>
        </div>
        <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
          <AiOutlineLogout size={"24px"}/>
          <h1 className='font-semibold text-lg mx-2'>Logout</h1>
        </div>
        <button className='w-full border-none my-2 px-4 py-2 rounded-full bg-[#1D9BF0] text-white text-md font-bold'>
          Post
        </button>
      </div>
    </div>
  )
}

export default LeftSidebar