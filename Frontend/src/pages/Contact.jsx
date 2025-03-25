import React from 'react';
import { assets } from '../assets/assets';
import { FiMapPin, FiPhone, FiMail, FiBriefcase } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-12">
      
      {/* Section Title */}
      <div className="text-center mb-10 pt-10">
        <p className="text-3xl sm:text-4xl font-extrabold text-gray-800 uppercase tracking-wide">
          Contact <span className="text-blue-600">Us</span>
        </p>
      </div>   

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 max-w-5xl mx-auto">
        
        {/* Contact Image */}
        <div className="w-full md:w-1/2">
          <img 
            src={assets.contact_image} 
            alt="Contact Us" 
            className="w-full h-auto max-w-sm rounded-lg shadow-md"
          />
        </div>

        {/* Contact Details */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          
          {/* Office Location */}
          <div className="flex items-center gap-3 text-gray-700">
            <FiMapPin className="text-blue-600 text-2xl" />
            <div>
              <p className="text-lg font-semibold text-gray-800">Our Office</p>
              <p>Faridabad, Haryana, India</p>
            </div>
          </div>

          {/* Phone & Email */}
          <div className="flex items-center gap-3 text-gray-700">
            <FiPhone className="text-blue-600 text-2xl" />
            <p>Tel: (+91) 9876543210</p>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FiMail className="text-blue-600 text-2xl" />
            <p>Email: medisched@gmail.com</p>
          </div>

          {/* Careers */}
          <div className="flex items-center gap-3 text-gray-700">
            <FiBriefcase className="text-blue-600 text-2xl" />
            <div>
              <p className="text-lg font-semibold text-gray-800">Careers at MediSched</p>
              <p>Learn more about our team and job openings.</p>
            </div>
          </div>

          {/* Explore Jobs Button */}
          <button 
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full 
                      shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <FiBriefcase className="text-xl" /> Explore Jobs
          </button>

        </div>

      </div>

    </div>
  );
};

export default Contact;



