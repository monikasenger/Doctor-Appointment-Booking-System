import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/adminContext';

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const [localDoctors, setLocalDoctors] = useState([]);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  useEffect(() => {
    setLocalDoctors(doctors);
  }, [doctors]);

  const handleAvailabilityChange = async (doctorId) => {
    setLocalDoctors((prevDoctors) =>
      prevDoctors.map((doc) =>
        doc._id === doctorId ? { ...doc, available: !doc.available } : doc
      )
    );
    await changeAvailability(doctorId);
  };

  return (
    <div className="m-4 h-full flex flex-col  p-6 rounded-xl shadow-2xl border border-blue-200">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-center text-blue-700 mb-6 tracking-wide drop-shadow-md">🏥 Meet Our Doctors</h1>
      
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {localDoctors.map((item) => (
          <div key={item._id} className="relative bg-white/90 backdrop-blur-md border border-gray-300 rounded-2xl p-5 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center">
            
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-400 shadow-md hover:rotate-3 transition-transform duration-200">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <p className="text-lg font-semibold text-blue-800 mt-4">{item.name}</p>
            <p className="text-sm text-gray-600 italic">{item.speciality}</p>
            
            <label className="absolute top-2 right-2 flex items-center gap-2 px-3 py-1 rounded-full shadow-md cursor-pointer 
                transition-all duration-300 text-xs font-semibold"
                  style={{
                backgroundColor: item.available ? '#D1FAE5' : '#FEE2E2',
                color: item.available ? '#047857' : '#B91C1C',
                borderColor: item.available ? '#34D399' : '#F87171',
              }}
            >
              <input
                type="checkbox"
                checked={item.available}
                onChange={() => handleAvailabilityChange(item._id)}
                className="hidden"
              />
              <div 
                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center 
                  ${item.available ? 'border-green-500 bg-green-400' : 'border-red-500 bg-red-400'}`}
              >
                {item.available && <span className="text-white text-[8px] font-bold">✔</span>}
              </div>
              {item.available ? "Available" : "Not Available"}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;