import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FaExclamationCircle } from "react-icons/fa";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(doc => 
          doc.speciality.toLowerCase().trim() === speciality.toLowerCase().trim()
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 text-white py-10 px-4 md:px-10 rounded-2xl shadow-xl">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide leading-snug">
            Find Your <span className="text-cyan-300 animate-pulse">Perfect Doctor</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg opacity-85 max-w-3xl mx-auto font-light">
            Browse our network of top-rated medical professionals and book your consultation with ease.
          </p>
        </div>
      </div>

      {/* Filter Toggle Button for Small Screens */}
      <button 
        onClick={() => setShowFilter(prev => !prev)} 
        className="py-2 px-4 border rounded-md text-sm font-medium bg-blue-500 text-white my-4 block sm:hidden"
      >
        {showFilter ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Layout for Filters & Doctor List */}
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        
        {/* Left Sidebar - Specialty Filters */}
        <div className={`w-full md:w-1/4 bg-blue-50 p-4 rounded-lg shadow-md h-95 overflow-auto transition-all 
                         ${showFilter ? 'block' : 'hidden sm:block'}`}>
          <h3 className="text-2xl font-semibold text-center text-blue-900 mb-3">Specialties</h3>
          <div className="flex flex-wrap md:flex-col gap-3">
            {["General Physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((spec, index) => (
              <button
                key={index}
                onClick={() => navigate(speciality === spec ? `/doctors` : `/doctors/${spec}`)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-300
                  ${speciality === spec ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-500 hover:bg-blue-600 hover:text-white'}`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Doctor Cards */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterDoc.length > 0 ? (
              filterDoc.map((item, index) => (
                <div
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  key={index}
                  className="bg-white shadow-lg rounded-xl p-4 sm:p-6 flex flex-col items-center gap-3 
                            hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer w-full"
                >
                  {/* Doctor Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-blue-100 border-4 border-blue-500 object-cover"
                  />

                  {/* Doctor Details */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-green-500">
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
                    <p className="text-base sm:text-lg font-bold text-gray-800 mt-2">{item.name}</p>
                    <p className="text-blue-600 font-medium">{item.speciality}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center col-span-full text-gray-500 mt-10">
                <FaExclamationCircle className="text-5xl text-blue-400 mb-3" />
                <p className="text-lg">No doctors found for this specialty.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
