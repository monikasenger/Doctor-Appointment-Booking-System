import React from "react";
import { assets } from "../assets/assets";
import { FaUserPlus } from "react-icons/fa"; // Import user-plus icon
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col md:flex-row items-center md:items-end justify-center text-center md:text-left bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 rounded-lg px-6 sm:px-10 md:px-12 mt-30px md:mt-20px mx-4 md:mx-8 shadow-lg">

 {/* Left Side */}
 <div className="flex-1 py-10 sm:py-16 flex flex-col items-center md:items-start">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
      Book an Appointment
    </h2>
    <p className="text-lg sm:text-xl md:text-2xl text-white mt-3">
      With 100+ Trusted Doctors
    </p>
    <button onClick={()=> {navigate('/login'); scrollTo(0,0)}}
    className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full mt-6 flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-md">
      <FaUserPlus className="text-lg" /> Create Account
    </button>
  </div>

      {/* Right Side */}
      <div className="hidden  md:block md:w-1/2 lg:w-[370px] relative">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-full absolute bottom-0 right-0 max:w-md"
        />
      </div>

    </div>
  );
};

export default Banner;
