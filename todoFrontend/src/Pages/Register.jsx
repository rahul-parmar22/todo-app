import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import axiosInstance from "../axios.js";
import { Link} from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formData = new FormData();

  formData.append("username", username);
  formData.append("password", password);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(formData.get("username"));

      const res = await axiosInstance.post("/users/register", formData);

      console.log(res.data.token);
    } catch (error) {
      console.log(error.response.data);
    }

    setUsername("");
    setPassword("");
  };

  return (

    <div className="flex justify-center items-center pt-16  ">

      <form
          onSubmit={handleSubmit}
          className="relative flex flex-col justify-center items-center bg-gray-300  rounded-sm pt-14 p-5"
        >
          <div className="absolute -top-8  bg-gray-300 rounded-[50%] h-15 w-15 content-center flex justify-center items-center border-3 border-white  ">
            <CiUser className="text-5xl " />
          </div>
          <h1 className=" font-bold text-2xl ">Sign up</h1>
          <div className="text-sm font-medium -mt-1 text-gray-500">Already have an account? <span className="text-gray-900 cursor-pointer hover:underline">Sign In</span></div>
    
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

              <div className="text-black flex justify-start gap-0.5  font-medium text-[12px] -mt-1" >
                <input type="checkbox" id="checkbox" />{" "}
                <label htmlFor="checkbox">Remember</label>
            </div>
    
            <button
              type="submit"
              className=" bg-black font-medium py-1 w-3/4 rounded-3xl cursor-pointer"
            >
             Create account
            </button>
          </div>
        </form>
    </div>
  );
};

export default Register;



// me aama user icon ne upar dekhadva mate -mt-8 karyu tu pan  e header ni upar overlap kartu hatu 



// Layout = position (relative/absolute)
// Spacing = margin / padding


// Negative margin ka rule:

// -mt-* element ko apne previous sibling ki taraf kheenchta hai,
// parent ke respect me nahi.

// Tumhara <form>:

// <form className="flex flex-col justify-center ...">


// Form ke upar koi boundary fix nahi

// Negative margin → element form se bahar nikal gaya

// Isliye wo page ke upar ke content pe overlap kar raha hai ❌


// ✅ BEST PRACTICE (PRO WAY)
// 🎯 Rule:

// Floating avatar / icon ke liye negative margin mat use karo
// 👉 relative + absolute use karo

// ✅ Correct & Stable Solution
// 1️⃣ Form ko relative banao
// <form
//   onSubmit={handleSubmit}
//   className="relative flex flex-col items-center bg-gray-300 rounded-sm pt-14"
// >


// pt-14 = icon ke liye upar jagah

// 2️⃣ Icon ko absolute position do
// <div className="absolute -top-8 bg-gray-300 rounded-full h-15 w-15 flex justify-center items-center border-3 border-white">
//   <CiUser className="text-5xl" />
// </div>

// 🔥 Result kya hoga?

// Icon form ke upar thoda bahar dikhega

// BUT ❗ form ke bahar nahi niklega

// Page ke dusre elements ko overlap nahi karega

// Responsive & clean ✨

// 🧠 Visual samajh lo
//    (icon)
//   ┌───────────┐
//   │   FORM    │
//   │  content  │
//   └───────────┘

// ❓ Negative margin kab use karein?

// Rare cases:

// Small spacing tweaks

// SAME container ke andar

// Layout movement ke liye ❌

// ✅ Golden Rule (yaad rakhna)

// Layout = position (relative/absolute)  aa form ma positioni most important chhe user icon mate..
// Spacing = margin / padding