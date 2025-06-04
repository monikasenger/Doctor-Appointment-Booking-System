import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center gap-6 py-12 text-gray-800 w-full px-4">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-blue-700 drop-shadow-md text-center">
        Find by Speciality
      </h1>

      {/* Description */}
      <p className="w-11/12 sm:w-3/4 text-center text-base sm:text-lg text-gray-600">
        Browse through our list of trusted doctors and book hassle-free appointments.
      </p>

      {/* Speciality List */}
      <div className="w-full max-w-6xl">
        {/* Small Screens: Horizontal Scroll */}
        <div className="flex gap-6 pt-5 overflow-x-auto scrollbar-hide px-4 w-full sm:hidden justify-start">
          {specialityData.map((item, index) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              key={index}
              to={`/doctors/${item.speciality}`}
              className="flex flex-col items-center text-sm cursor-pointer flex-shrink-0 
                        hover:text-red-600 transition-all duration-500 transform hover:-translate-y-2"
            >
              <img
                src={item.image}
                alt={item.speciality}
                className="w-20 sm:w-24 md:w-28 lg:w-32 mb-2 drop-shadow-lg"
              />
              <p className="font-semibold text-base sm:text-lg">{item.speciality}</p>
            </Link>
          ))}
        </div>

        {/* Medium & Large Screens: Grid Layout */}
        <div className="hidden sm:grid sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-2 pt-5 justify-center">
          {specialityData.map((item, index) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              key={index}
              to={`/doctors/${item.speciality}`}
              className="flex flex-col items-center text-sm cursor-pointer 
                        hover:text-red-600 transition-all duration-500 transform hover:-translate-y-2"
            >
              <img
                src={item.image}
                alt={item.speciality}
                className="w-24 md:w-28 lg:w-32 mb-2 drop-shadow-lg"
              />
              <p className="font-semibold text-base sm:text-lg">{item.speciality}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;
