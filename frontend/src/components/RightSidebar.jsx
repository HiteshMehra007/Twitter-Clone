import React from 'react'
import Avatar from 'react-avatar';
import { CiSearch } from "react-icons/ci";

const RightSidebar = () => {
  return (
    <div className='right-sidebar w-[25%]'>
      <div className='search-bar flex items-center p-2 bg-gray-100 rounded-full w-full'>
        <CiSearch size="20px" />
        <input className='px-2 outline-none bg-transparent' type="text" placeholder='Search' />
      </div>
      <div className='follow-suggestion my-4 p-2 bg-gray-100 rounded-lg w-full'>
        <h1 className='font-bold text-lg mb-2 p-2'>Who to follow</h1>
        <div className='suggestion-div mb-2'>
          <div className='flex item-center justify-between'>
            <div className='flex items-center'>
              <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
              <div className='ml-1'>
                <h1>Code with Harry</h1>
                <p className='text-md text-gray-500'>@codewithharry</p>
              </div>
            </div>
            <div className='py-2'>
              <button className='px-3 py-1 ml-1 bg-black text-white rounded-full'>Follow</button>
            </div>
          </div>
        </div>
        <div className='suggestion-div mb-2'>
          <div className='flex item-center justify-between'>
            <div className='flex items-center'>
              <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
              <div className='ml-1'>
                <h1>Javascript</h1>
                <p className='text-md text-gray-500'>@jsmmastery</p>
              </div>
            </div>
            <div className='py-2'>
              <button className='px-3 py-1 ml-1 bg-black text-white rounded-full'>Follow</button>
            </div>
          </div>
        </div>
        <div className='suggestion-div mb-2'>
          <div className='flex item-center justify-between'>
            <div className='flex items-center'>
              <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
              <div className='ml-1'>
                <h1>Chai aur Code</h1>
                <p className='text-md text-gray-500'>@chaiaurcode</p>
              </div>
            </div>
            <div className='py-2'>
              <button className='px-3 py-1 ml-1 bg-black text-white rounded-full'>Follow</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default RightSidebar