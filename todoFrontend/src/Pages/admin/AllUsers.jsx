import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axios.js';

const AllUsers = () => {

    const [users, setUseres]= useState([]);

    const fetchUsers = async()=>{
        const res = await axiosInstance('/admin');// ahi aavu pan kari shakay   const {data} = to response ma je data chhe e direct destructure karine aavi jay aapani pase
             console.log(res.data); 
             setUseres(res.data); 
    }


useEffect(()=>{
    fetchUsers(); 
},[])
    

  return (
    <div>
    {
      users.map((user,i)=>{
        return(
          <div className=' flex gap-2 bg-gray-100 pl-2' key={i}>
                        <div>
              {user.username}-
            </div>
            <div>{user.role}</div>
            
            </div>
        )
      })
    }
    </div>
  )
}

export default AllUsers;


