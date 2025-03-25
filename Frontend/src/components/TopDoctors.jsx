import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi"; // Importing the icon
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-8 py-12 text-gray-900 w-full">
      {/* Heading Section */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-blue-700 drop-shadow-md">
        Top Doctors to Book
      </h1>
      <p className="text-center text-gray-600 text-base sm:text-lg md:text-xl sm:w-3/4 md:w-2/3">
        Simply browse through our extensive list of trusted doctors and book
        hassle-free appointments.
      </p>

      {/* Doctors Grid - 2 Columns on Small Screens */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full px-4 sm:px-12">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 sm:p-6 flex flex-col items-center gap-3 
                       hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer w-full"
          >
            {/* Doctor Image - Scales Properly */}
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-blue-500 object-cover"
            />

            {/* Doctor Details */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                <div
                  className={`w-2 h-2 ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  } rounded-full`}
                ></div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    item.available
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.available ? "Available" : "Not Available"}
                </span>
              </div>

              <p className="text-base sm:text-lg font-bold text-gray-800 mt-2">
                {item.name}
              </p>
              <p className="text-blue-600 font-medium">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0); // Scrolls to top
        }}
        className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full 
                 shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 
                 flex items-center gap-2 text-lg"
      >
        More <FiArrowRight className="text-xl" />
      </button>
    </div>
  );
};

export default TopDoctors;
