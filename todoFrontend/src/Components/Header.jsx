import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import RoleContext from "../contexts/RoleContext";
const Header = () => {
  const { role } = useContext(RoleContext);

  return (
    <header>
      <nav className="bg-gray-300 flex justify-between items-center text-sm px-2 py-2">
        <Link to="/todos">
          <div className="font-medium bg-gray-500 text-white border flex justify-center items-center h-11 w-11   rounded-full cursor-pointer">
            To-Do
          </div>
        </Link>

        <Button />
        <div className="space-x-2">
          {
            role === "admin" &&
                      <Link to="/admin">
            <button className="cursor-pointer hover:underline">Dashboard</button>
          </Link>
        

          }
          <Link to="/register">
            <button className="cursor-pointer hover:underline">Register</button>
          </Link>
          <Link to="/login">
            <button className="cursor-pointer hover:underline">Login</button>
          </Link>
        
        </div>
      </nav>
    </header>
  );
};

export default Header;


// 🔑 Main Difference
// | `<Link>`          | `navigate()`                |
// | ----------------- | --------------------------- |
// | Component hai     | Function hai                |
// | Direct navigation | Logic ke baad navigation    |
// | Mostly UI links   | Programmatic navigation     |
// | Navbar / menu     | Login success / form submit |

