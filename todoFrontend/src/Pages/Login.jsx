import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import axiosInstance from "../axios.js";
import RoleContext from "../contexts/RoleContext.jsx";

const Login = () => {

  const {role, setRole} = useContext(RoleContext)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const formData = new FormData();

  formData.append("username", username);
  formData.append("password", password);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(formData.get("username"));


      //Axios ka syntax hota hai::  axios.post(url, data, config)   //1st → url  2nd → body data   3rd → headers/config
      const res = await axiosInstance.post("/users/login", formData);
      console.log(res.data);
      console.log(res.data.token);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role)
setRole(res.data.role); 

    res.data.role === 'admin'? navigate('/admin'): navigate('/todos')



    } catch (error) {
      console.log(error.response.data);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="p-1 relative top-16 ">
      <form   //form tag na use thi enter key thi submit button work kare and required, validation aapi shako..only input lakho without form to require no work kare...
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center bg-gray-300  rounded-sm"
      >
        <div className="bg-gray-300 rounded-[50%] h-15 w-15 content-center flex justify-center items-center border-3 border-white ">
          <CiUser className="text-5xl"/>
        </div>
        <h1 className="uppercase font-bold text-2xl ">login</h1>
        <div className="text-sm font-medium -mt-1 text-gray-500">
          Don't have an account?{" "}
          <span className="text-gray-900 cursor-pointer hover:underline">
            Register
          </span>
        </div>

        <div className="text-white text-center mt-8 space-y-3 mb-7">
          <div className="bg-black text-sm rounded-3xl flex items-center space-x-2 px-3 py-1">
            <FaUser />
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="bg-black text-sm rounded-3xl flex items-center space-x-2 px-3 py-1 mt-6">
            <IoMdLock />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-black flex justify-between  font-medium text-[12px]">
            <div className="cursor-pointer">
              <span className="text-white">Forge</span>t Password?
            </div>
          </div>

          <button
            type="submit"
            className="uppercase bg-black font-bold py-1 w-3/4 rounded-3xl"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
