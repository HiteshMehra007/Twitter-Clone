import React from 'react'
import { CreatePost } from './CreatePost'
import Tweet from './Tweet'

const Feed = () => {
  return (
    <div className='w-[50%] border border-gray-200 rounded-lg'>
      <div>
        <CreatePost />
        <Tweet />
      </div>
    </div>
  )
}

export default Feed