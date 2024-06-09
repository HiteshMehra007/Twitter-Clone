import React from 'react'
import Avatar from 'react-avatar';
import { CiImageOn } from "react-icons/ci";

export const CreatePost = () => {
  return (
    <div className='create-post w-[100%] m-auto'>
        <div className='top-bar item-center flex justify-between border-b border-gray-200 rounded-lg'>
            <div className='px-3 py-4 cursor-pointer hover:bg-gray-200 w-full text-center rounded-lg'>
                <h1 className='font-bold text-md text-gray-600'>For you</h1>
            </div>
            <div className='px-3 py-4  cursor-pointer hover:bg-gray-200 w-full text-center rounded-lg'>
                <h1 className='font-semibold text-md text-gray-600'>Following</h1>
            </div>
        </div>
        <div className='post-content m-4'>
            <div className='flex items-center'>
                <div className='avatar mb-2'>
                    <Avatar src="https://pbs.twimg.com/profile_images/1580957780243906563/x6GKB7Dg_400x400.jpg" size="50" round={true} />
                </div>
                <input className='w-full text-lg border-none outline-none ml-2' type="text" placeholder="What's going on?!"/>
            </div>
            <div className='post-format-tools flex justify-between px-4 py-2 border-b border-gray-300'>
                <div>
                    <CiImageOn className='cursor-pointer' size="20px"/>
                </div>
                <button className='px-4 py-1 bg-[#1D98F0] text-white text-md rounded-full'>Post</button>
            </div>
        </div>
    </div>
  )
}
