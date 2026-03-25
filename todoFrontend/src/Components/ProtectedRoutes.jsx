import React from 'react'; 
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import RoleContext from '../contexts/RoleContext.jsx'

//navigate('/login') vs   <Navigate to='/login' />  👌👌👌

const ProtectedRoutes = ({children}) => {

    const {role} = useContext(RoleContext); 

// const role = localStorage.getItem("role");//wihtout usecontext direct local storage mathi leta hta

if(!role) return   <Navigate to='/login' /> //ahi protected routes e ek componnet chhe je kaik return kare.....ane aa je return kare e hamesha aa component use jya karvi tya dekhay..to etale ahi component ma navlink lakelu chhe...aa only route nahti change karti pan aa return kare che component...ane jyare only route change karva hoy instantly like login pachhi home page redirect karo tyare ues thay direct  navigate(./home) vagereno

 if(role !== "admin")  return   <Navigate to='/' />
 return children;
}
export default ProtectedRoutes; 
