import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const NotFound = () => {  
  return (
    <div className="relative flex-1 w-full  ">
      <img
        src="landingPage.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover" //ahi h-full aano parent aa main div ane eno parent he layout ma chhe nyathi aave chhe...karan ke aa badha flex-item chhe to e bydefault h-full lakho to tena parent thi le .... 
      />
 
      <div className="absolute inset-0 bg-black/45 text-white flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <div className="text-6xl">404</div>

          <div className="text-center text-sm">
            <div>Page not found!</div>
            <div>The requested page was not found</div>
          </div>

          <button className="bg-black/60 px-2 rounded-sm">
            <NavLink to="/" className="flex items-center gap-1">
              Home <IoIosArrowRoundForward />
            </NavLink>
          </button>
        </div>
      </div>

      <div>sdfsdfsdaf</div>  
      {/* aa nahi show thay karan ke aa pachhalni baju hashe image full and blck bg nu inset 0 aane nahi dekahva de... to kaik aama add karvu hoy to kem add karo ?  */}
    </div>
  );
};


export default NotFound;


//extra content add karvo hoy to 
// <div className="relative flex-1 w-full overflow-y-auto">
//   {/* Background */}
//   <div className="absolute inset-0">
//     <img
//       src="landingPage.jpg"
//       alt=""
//       className="w-full h-full object-cover"
//     />
//     <div className="absolute inset-0 bg-black/45" />
//   </div>

//   {/* Content (scrollable) */}
//   <div className="relative z-10 min-h-full flex flex-col items-center justify-center py-20 text-white">
//     <div className="text-6xl mb-4">404</div>

//     <div className="text-center text-sm mb-6">
//       <div>Page not found!</div>
//       <div>The requested page was not found</div>
//     </div>

//     <NavLink
//       to="/"
//       className="bg-black/60 px-3 py-1 rounded-sm flex items-center gap-1"
//     >
//       Home →
//     </NavLink>

//     {/* Extra content – scroll test */}
//     <div className="mt-32 space-y-4 max-w-md text-center">
//       <p>Extra content 1</p>
//       <p>Extra content 2</p>
//       <p>Extra content 3</p>
//       <p>Extra content 4</p>
//       <p>Extra content 5</p>
//     </div>
//   </div>
// </div>
