import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Avatar from "react-avatar";

const Profile = () => {
  return (
    <div className='profile w-[50%] border-t border-l border-r border-gray-200'>
      <div>
        <div className='top-bar flex item-center py-2'>
          <Link to="/" className='back-icon p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
            <FaArrowLeft size="20px" />
          </Link>
          <div className='ml-4'>
            <h1 className='font-bold text-lg'>MrBeast</h1>
            <p className='text-sm text-gray-500'>6,703 posts</p>
          </div>
        </div>
        <img src="https://pbs.twimg.com/profile_banners/2455740283/1601560191/1080x360" alt="profile-banner" />
        <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
                    <Avatar src="https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg" size="120" round={true} />
                </div>
                <div className='text-right m-4'>
                  <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>
                </div>
                <div className='m-4'>
                    <h1 className='font-bold text-xl'>Mr. Beast</h1>
                    <p>@mrbeast</p>
                </div>
                <div className='m-4 text-sm'>
                    <p>🌐 Exploring the web's endless possibilities with MERN Stack 🚀 | Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me on this coding journey!</p>
                </div>
      </div>
    </div>
  )
}

export default Profile