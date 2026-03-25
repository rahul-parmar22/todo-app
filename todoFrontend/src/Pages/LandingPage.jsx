import React from "react";
import { Link } from "react-router-dom";
import { FaMobileScreen } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const LandingPage = () => {
  return (
    <div className="min-h-screen relative">
      <main className="flex-grow">
        <div className="relative h-[50vh]">
          <img
            src="landingPage.jpg"
            alt="Landing"
            className="w-full h-full object-cover"  //ahi image have responsive chhe ..jem jem parnet ni heght  badle tem tem image ni pan height badle ...
          />

          <div className="absolute inset-0 flex flex-col justify-center px-5 space-y-2 bg-black/30">
            <h1 className="capitalize font-medium text-white text-lg">
              boost your productivity with to-do
            </h1>
            <p className="capitalize text-[10px] text-white">
              the ultimate task manager tool to keep you on top of your game and
              accomplish your goals
              
            </p>
          </div>
        </div>

        {/* below code is my code and above code is generate from chatgpt */}
        {/* 
📌 Best Practices Summary (Yaad rakhna 🔥) mara nichena code ma chhe aa galti
✅ DO
min-h-screen instead of h-screen //khas yad rakhvu ..register,login page ma pan me aa karelu chhe..
Hero image → vh based height
object-cover for images   //khas karvu..kyarey pan thodik jagya ma pan image kem set karvi e khyal rakhvo
Footer → flexbox sticky footer     
Avoid w-screen unless really needed   


❌ DON’T
Footer ke liye position: fixed
Layout ke liye unnecessary absolute
Child height ko parent ke fraction pe depend karna

        <div className="w-[90%]  absolute top-30 left-5   space-y-2">
        <h1 className="capitalize  font-medium">
          boost your productivity with to-do
        </h1>
        <p className="capitalize text-[10px]">
          the ultimate task manager tool to keep you on top of your game and
          accomplish your goals
        </p>
      </div>
      <img src="landingPage.jpg" alt="" className="w-screen h-1/3" /> */}
        <div className="flex flex-col items-center bg-[#efefef] py-6">
          <div className="space-y-2 px-8 py-4">
            <div className="font-medium flex items-center border-b-1 border-gray-300  space-x-1">
              <div className=" ">
                <FaMobileScreen />
              </div>
              <h2 className="capitalize">intuitive interface</h2>
            </div>
            <div className="text-[gray] text-xs capitalize">
              our user-friendly interface makes it easy to manage your task and
              stay organized.
            </div>
          </div>
          <div className="space-y-2 px-8 py-4">
            <div className="font-medium flex items-center border-b-1 border-gray-300  space-x-1">
              <div className=" ">
                <MdEdit />
              </div>
              <h2 className="capitalize">customizable lists</h2>
            </div>
            <div className="text-[gray] text-xs capitalize">
              create custom lists to organize your tasks and prioritize what's
              most important
            </div>
          </div>
          <div className="space-y-2 px-8 py-4">
            <div className="font-medium flex items-center border-b-1 border-gray-300  space-x-1">
              <div className=" ">
                <MdOutlineSecurity />
              </div>
              <h2 className="capitalize"> security and privacy</h2>
            </div>
            <div className="text-[gray] text-xs capitalize">
              your data is always secure and private with our state-of-the-art
              security measures.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
