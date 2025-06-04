import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUserPlus } from "react-icons/fi"; // Import icons
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate();
  const {token,setToken,userData}= useContext(AppContext)
  const logout =()=>{
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600/90 backdrop-blur-md 
                border border-white/20 shadow-xl rounded-full px-4 md:px-6 lg:px-8 py-3 
                flex items-center justify-between mx-3 sm:mx-6 mt-4 transition-all duration-300 
                relative z-50">
 
      {/* Logo & Heading */}
      <div onClick={()=>navigate('/') }className="flex items-center gap-2 sm:gap-3">
        <img 
          src={assets.logo}
          alt="Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full shadow-lg border-2 border-white/70 transition-transform transform hover:scale-110"
        />
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[Poppins] font-bold tracking-wide text-white drop-shadow-md">
          Medi<span className="text-blue-300 animate-pulse">Sched</span><span className="text-green-400">+</span>
        </h1>
      </div>

       
      {/* Mobile Menu Button (Hamburger Menu) */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-3xl">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Navigation Links */}
      <ul
  className={`absolute md:static top-14 left-40 w-2/5 md:w-auto bg-blue-800 md:bg-transparent 
  flex flex-col md:flex-row items-center gap-1 md:gap-4 font-medium font-serif text-white 
  text-medium md:text-base p-4 md:p-0 shadow-lg md:shadow-none rounded-lg transition-all duration-300 
  ${isOpen ? "block h-auto max-h-60 py-2 px-3 " : "hidden md:flex"}`}
>
  <NavLink to="/" className="w-full text-center md:w-auto" onClick={() => setIsOpen(false)}>
    <li className="py-1 text-small md:text-base">HOME</li>
    <hr className="border-none h-0.5 bg-blue-300 w-2/5 md:w-4/5 m-auto hidden group-[.active]:block"></hr>
  </NavLink>

  <NavLink to="/doctors" className="w-full text-center md:w-auto" onClick={() => setIsOpen(false)}>
    <li className="py-1 text-small md:text-base">ALL DOCTORS</li>
    <hr className="border-none h-0.5 bg-blue-300 w-2/5 md:w-4/5 m-auto hidden group-[.active]:block"></hr>
  </NavLink>

  <NavLink to="/about" className="w-full text-center md:w-auto" onClick={() => setIsOpen(false)}>
    <li className="py-1 text-small md:text-base">ABOUT</li>
    <hr className="border-none h-0.5 bg-blue-300 w-2/5 md:w-4/5 m-auto hidden group-[.active]:block"></hr>
  </NavLink>

  <NavLink to="/contact" className="w-full text-center md:w-auto" onClick={() => setIsOpen(false)}>
    <li className="py-1 text-small md:text-base">CONTACT</li>
    <hr className="border-none h-0.5  bg-blue-300 w-2/5 md:w-4/5 m-auto hidden group-[.active]:block"></hr>
  </NavLink>
</ul>




      {/* Profile & Create Account Button */}
      <div className='flex items-center gap-4'> 
        {token  && userData
        ? (
          <div className='relative group'>
            {/* Profile Picture & Dropdown Icon */}
            <div className='flex items-center gap-1 cursor-pointer'>
              <img className='w-14 rounded-full border-2 border-white shadow-lg' src={userData.image} alt="Profile Pic" />
              <img className='w-5' src={assets.dropdown_icon} alt="Dropdown Icon" />
            </div>

              {/* Dropdown Menu */}
                <div className="absolute right-0 mt-3 w-52 bg-white text-gray-700 rounded-xl shadow-xl py-3 
                            transition-all duration-300 ease-in-out scale-95 opacity-0 invisible 
                            group-hover:scale-100 group-hover:opacity-100 group-hover:visible z-50">
              <p onClick={() => navigate('/my-profile')} className="px-5 py-2 hover:bg-gray-200 cursor-pointer rounded-md">
                My Profile
              </p>
              <p onClick={() => navigate('/my-appointments')} className="px-5 py-2 hover:bg-gray-200 cursor-pointer rounded-md">
                My Appointments
              </p>
              <p className="px-5 py-2 hover:bg-red-200 cursor-pointer rounded-md text-red-600" onClick={logout}>
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white 
                      font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform 
                      hover:scale-105 hover:shadow-blue-400/50 flex items-center gap-2 hidden sm:flex"
          >
            <FiUserPlus className="text-xl" />
            <span>Create Account</span>
          </button>
        )}
      </div>

    </div>
  );
};

export default Navbar;