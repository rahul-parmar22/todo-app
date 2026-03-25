import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
   <div className="bg-gray-800 text-white px-3 py-2 text-sm flex justify-between items-center w-full">

      <img src="../public/footerTodoImg.png" alt="" className="h-11 rounded-full " />
      <div className="flex text-xs gap-2">
        <Link to="/">
          <button className="cursor-pointer">HOME</button>
        </Link>

        <div>STORE</div>
      </div>
    </div>
  );
};

export default Footer;


// 🧠 Rule yaad rakhna (Golden Rules)
// ✅ Footer ko:

// position: fixed ❌

// Page ke andar manually ❌

// Layout ke bahar ❌

// ✅ Footer ko:

// min-h-screen flex flex-col ke last me

// flex-grow wale main ke baad