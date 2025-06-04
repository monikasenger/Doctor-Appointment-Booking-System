import React, { useEffect, useContext, useState, useMemo } from "react";
AdminContext
import { AppContext } from "../../context/appContext";
import { assets } from "../../assets/assets";
import {
  FaUser,
  FaCalendarAlt,
  FaTimesCircle,
  FaCheckCircle,
  FaUserMd,
  FaMoneyBillWave,FaBolt
} from "react-icons/fa";
import { AdminContext } from "../../context/AdminContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment,markAsPaidOnline } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (aToken) {
      getAllAppointments().finally(() => setLoading(false));
    }
  }, [aToken]);

  // Optimized sorting
  const sortedAppointments = useMemo(() => [...appointments].reverse(), [appointments]);

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <h2 className="mb-5 text-2xl font-semibold flex items-center gap-2">
        📅 <FaUserMd /> All Appointments
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading appointments...</p>
      ) : sortedAppointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments available</p>
      ) : (
        <div className="bg-white border rounded-lg text-sm max-h-[80vh] overflow-y-auto shadow-md">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] py-3 px-6 border-b bg-blue-600 text-white font-semibold">
            <p>#</p>
            <p className="flex items-center gap-2"><FaUser /> Patient</p>
            <p className="flex items-center gap-2"><FaCalendarAlt /> Age</p>
            <p className="flex items-center gap-2"><FaCalendarAlt /> Date & Time</p>
            <p className="flex items-center gap-2"><FaUserMd /> Doctor</p>
            <p className="flex items-center gap-2"><FaMoneyBillWave /> Fees</p>
            <p className="flex items-center gap-2"><FaBolt /> Action</p> {/* Action Icon */}

          </div>

          {/* Table Body */}
          {sortedAppointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] gap-4 items-center text-gray-700 py-3 px-6 border-b hover:bg-blue-50 transition-all duration-200 rounded-md text-sm"
            >
              {/* Serial Number */}
              <p className="hidden sm:block font-semibold text-gray-800">{index + 1}</p>

              {/* Patient Info */}
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full border border-gray-400 shadow-md"
                  src={item.userData.image || assets.default_user}
                  alt="Patient"
                />
                <p className="font-medium text-gray-900">{item.userData.name}</p>
              </div>

              {/* Age */}
              <p className="font-medium text-sm text-gray-800">{calculateAge(item.userData.dob)} yrs</p>

              {/* Date & Time */}
              <p className="flex items-center gap-2 text-blue-700 font-semibold text-sm">
                <FaCalendarAlt /> {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              {/* Doctor Info */}
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full border border-gray-400 shadow-md bg-gray-300"
                  src={item.docData.image || assets.default_doctor}
                  alt="Doctor"
                />
                <p className="font-medium text-gray-900">{item.docData.name}</p>
              </div>

              {/* Fees */}
              <p className="flex items-center gap-2 text-green-700 font-semibold text-sm">
                <FaMoneyBillWave /> {currency} {item.amount}
              </p>

               {/* Action Buttons */}
                          {item.cancelled ? (
                            <p className="text-red-500 text-xs font-bold flex items-center gap-2">
                              <FaTimesCircle /> Cancelled
                            </p>
                          ) :  item.payment ? (
                            <p className="text-blue-500 text-xs font-bold flex items-center gap-2">
                              <FaCheckCircle /> Paid Online
                            </p>
                          ) : item.isCompleted ? (
                            <p className="text-green-500 text-xs font-bold flex items-center gap-2">
                              <FaCheckCircle /> Completed
                            </p>
                          ) : (
                              <button
                                onClick={() => cancelAppointment(item._id)}
                                className="flex items-center gap-1 text-red-600 border border-red-500 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition duration-200"
                              >
                                <FaTimesCircle /> Cancel
                              </button>
              
                              
                            
                          )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
