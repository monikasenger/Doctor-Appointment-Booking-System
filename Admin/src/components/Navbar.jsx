import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/adminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/");
      aToken && setAToken("");
      aToken && localStorage.removeItem("aToken");
      dToken && setDToken("");
      dToken && localStorage.removeItem("dToken");
    }
  };

  return (
    <nav
      className="w-full px-4 sm:px-6 lg:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 
    shadow-lg border-b border-white/20 rounded-b-2xl flex items-center justify-between transition-all duration-300"
    >
      {/* Left: Logo, App Title & Role Badge */}
      <div className="flex items-center gap-3 sm:gap-4 ml-9">
        {/* Logo */}
        <img
          src={assets.logo}
          alt="Logo"
          className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-white shadow-lg 
          transition-transform hover:scale-110 hover:rotate-3 duration-300"
        />

        {/* App Title */}
        <div>
          <h1 className="text-base sm:text-xl font-extrabold tracking-wide text-white flex items-center gap-1">
            Medi<span className="text-cyan-300 animate-pulse">Sched</span>
            <span className="text-teal-300">+</span>
          </h1>
          <p className="text-gray-200 text-xs sm:text-sm font-light tracking-wide">
            Dashboard Panel
          </p>
        </div>

        {/* Role Badge - Smaller on Small Screens */}
        <span
          className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-4 py-0.5 sm:py-1.5 rounded-full border 
    ${
      aToken
        ? "bg-yellow-200 border-yellow-500 text-yellow-700"
        : "bg-blue-200 border-blue-500 text-blue-700"
    }  
    transition-all hover:scale-105 hover:shadow-md duration-300`}
        >
          {aToken ? "👑 Admin" : "🩺 Doctor"}
        </span>
      </div>

      {/* Right: Logout Button - Smaller on Small Screens */}
      <button
        onClick={logout}
        className="px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-sm font-semibold text-white rounded-full 
        bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg border border-white/20 
        transition-transform hover:scale-105 active:scale-95 duration-300"
      >
        Logout 🚀
      </button>
    </nav>
  );
};

export default Navbar;
