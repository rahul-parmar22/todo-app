import React from 'react'
import AllUsers from './AllUsers';

const AdminDashboard = () => {
  return (
    <div className='flex gap-2 mt-1 pl-0.5 cursor-pointer '>
      <button className='h-1/2 bg-gray-700 text-white text-sm font-medium p-1 rounded-sm '>
        Users
      </button>
      <div>

      <div>
         admin dashboard..! 
      </div>
      <div>  <AllUsers/> </div>
      </div>
    </div>
  )
}

export default AdminDashboard; 
