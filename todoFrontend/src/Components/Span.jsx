import React from 'react'
import { useContext } from 'react'
import RoleContext from '../contexts/RoleContext'

const Span = () => {

const value = useContext(RoleContext) //or const { ram, role } = useContext(RoleContext); array thi aavti hoy value to const [ram, role] = useContext(RoleContext); thi destructure karvu...destructuring chhe only


  return (
    <div className=' bg-yellow-700'>
       i am span  <button>{value.role} </button>
    </div>
  )
}

export default Span
