import React from 'react'
import DashboardLayout from '../layout/DashboardLayout'

const Posts = () => {
  return (
    <div className='flex bg-gray-900 text-white'>
        <DashboardLayout/>

        <div className='flex-1 p-6'>
            <h1 className='text-3xl font-bold mb-4'>Posts Page</h1>
            <p>Welcome to the Posts page!</p>
        </div>
    </div>
  )
}

export default Posts