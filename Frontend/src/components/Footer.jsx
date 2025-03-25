import React from "react";
import { assets } from "../assets/assets";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-12 md:gap-13 my-9 mt-20 text-sm">
        
        {/* Left Section - Brand & Description */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-1">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-10 h-14 md:w-16 md:h-16 rounded-full  transform transition-transform hover:scale-110"
            />
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-gray-800">
              Medi<span className="text-blue-500">Sched</span><span className="text-green-500">+</span>
            </h1>
          </div>
          <p className="w-full md:w-3/4 text-gray-700 mt-3 leading-6">
            At MediSched, we provide accessible and reliable healthcare solutions. 
            Our network of 100+ trusted doctors ensures seamless appointment booking. 
            Your health is our priority, offering expert guidance anytime, anywhere.
          </p>
        </div>

        {/* Center Section - Navigation */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-blue-600">Company</h2>
          <ul className="flex flex-col gap-2 text-gray-700">
            <li className="hover:text-blue-500 cursor-pointer transition-all duration-200">🏠 Home</li>
            <li className="hover:text-blue-500 cursor-pointer transition-all duration-200">📖 About Us</li>
            <li className="hover:text-blue-500 cursor-pointer transition-all duration-200">📩 Contact Us</li>
            <li className="hover:text-blue-500 cursor-pointer transition-all duration-200">🔒 Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section - Contact */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-blue-600">Get in Touch</h2>
          <ul className="flex flex-col gap-2 text-gray-700">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-500" /> +91-9876543210
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" /> medisched@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-400 my-3 mx-auto w-5/6"></div>

      {/* Copyright Text */}
      <div className="text-center  text-sm">
        &copy; 2025 MediSched - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

