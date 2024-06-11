import React from 'react'
import Avatar from 'react-avatar'
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";


const Tweet = () => {
  return (
    <div>
        <div className='flex p-4 border-b border-gray-200'>
            <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
            <div className='ml-2 w-full'>
                <div className='flex item-center'>
                    <h1 className='font-bold'>Hitesh Mehra</h1>
                    <p className='text-gray-500 text-sm ml-1'>@hiteshmehra809 . 1m</p>
                </div>
                <div>
                    <p>Hello Developers! Lets connect and grow together.</p>
                </div>
                <div className='flex justify-between my-3'>
                    <div className='flex items-center'>
                        <div className='p-2 hover:bg-green-200 cursor-pointer rounded-full'>
                            <FaRegComment size="18px"/>
                        </div>
                        <p>0</p>
                    </div>
                    <div className='flex items-center'>
                        <div className='p-2 hover:bg-pink-200 cursor-pointer rounded-full'>
                            <CiHeart size="19px"/>
                        </div>
                        <p>0</p>
                    </div>
                    <div className='flex items-center'>
                    <div className='p-2 hover:bg-blue-200 cursor-pointer rounded-full'>
                            <CiBookmark size="19px"/>
                        </div>
                        <p>0</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tweet