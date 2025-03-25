import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
      setRelDocs(doctorData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col mt-6 items-center gap-3 py-8 text-gray-900">
        
        {/* Section Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-blue-700 text-center">
          Related Doctors
        </h1>
        <p className="text-gray-600 text-sm sm:text-lg md:text-xl text-center max-w-3xl">
          Simply browse through our extensive list of trusted doctors.
        </p>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-6xl">
          {relDoc.slice(0, 5).map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              key={index}
              className="bg-white shadow-md rounded-xl p-4 sm:p-5 flex flex-col items-center gap-4 
                          hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer w-full max-w-xs mx-auto"
            >
              {/* Doctor Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full border-4 border-blue-500 object-cover"
              />

              {/* Doctor Details */}
              <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold">
  <div className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-red-500"} rounded-full`}></div>
  <span className={`px-2 py-0.5 rounded-full text-xs ${item.available ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
    {item.available ? "Available" : "Not Available"}
  </span>
</div>

                <p className="text-sm sm:text-base font-bold text-gray-800 mt-2">{item.name}</p>
                <p className="text-blue-600 font-medium text-xs sm:text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

        {/* More Button */}
        <button
          onClick={() => {
            navigate('/doctors');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mt-6 bg-blue-600 text-white font-semibold py-2 sm:py-3 px-5 sm:px-6 rounded-full 
                    shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 
                    flex items-center gap-2 text-base sm:text-lg"
        >
          More <FiArrowRight className="text-lg sm:text-xl" />
        </button>
      </div>
    </div>
  );
};

export default RelatedDoctors;
