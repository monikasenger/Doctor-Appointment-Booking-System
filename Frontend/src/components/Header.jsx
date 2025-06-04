import React from 'react';
import { FiArrowRight } from "react-icons/fi"; // Import arrow icon
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 
    text-white rounded-lg shadow-2xl px-6 sm:px-12 md:px-20 lg:px-20 py-0 mt-8 
    flex flex-col md:flex-row items-center justify-between gap-8 
    backdrop-blur-lg overflow-hidden z-10">

      {/* Left Side */}
      <div className="flex flex-col gap-4 text-center md:text-left pt-6 sm:pt-8 md:pt-0">
  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug drop-shadow-lg 
                font-[Playfair Display] tracking-wide">
    Book Appointment with Trusted Doctors
  </p>
  
  <div className="flex items-center gap-4">
    <img 
      src={assets.group_profiles} 
      alt="Doctors" 
      className="w-20 sm:w-24 md:w-28 lg:w-32 drop-shadow-xl flex-shrink-0" 
    />
    <p className="text-gray-200 text-sm sm:text-base md:text-lg font-[Inter] tracking-wide leading-relaxed flex-1">
      Browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
    </p>
  </div>

  {/* Stylish Book Appointment Button */}
  <a 
    href="#speciality" 
    className="bg-white text-blue-700 font-semibold font-[Inter] text-sm sm:text-base md:text-lg 
               py-2 px-4 sm:py-3 sm:px-6 rounded-full flex items-center gap-3 w-fit 
               transition-all duration-300 transform hover:scale-105 shadow-lg 
               hover:shadow-blue-400/50 hover:bg-gray-100 mx-auto md:mx-0"
  >
    <span>Book Appointment</span>
    <FiArrowRight className="text-lg sm:text-xl" />
  </a>
</div>


 {/* Right Side - Image & Glow Effect */}
<div className="relative flex justify-center md:justify-end items-end w-full md:w-1/2 h-auto min-h-[140px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] xl:min-h-[450px]">

{/* Background Glow Effect */}
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 
                w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72
                bg-blue-400 rounded-full opacity-30 blur-3xl">
</div>

{/* Header Image */}
<img 
  src={assets.header_img} 
  alt="Header Image" 
  className="w-66 sm:w-74 md:w-86 lg:w-92 xl:w-100 2xl:w-106 h-auto
             drop-shadow-2xl relative"
/>
</div>


    </div>
  );
};

export default Header;
