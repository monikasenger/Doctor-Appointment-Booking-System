import React, { useContext, useEffect, useMemo } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import {
  FaUser,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaTimesCircle,
  FaCheckCircle,
  FaCashRegister,
  FaBolt,
} from "react-icons/fa";
import { AppContext } from "../../context/appContext";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  // Sort appointments (newest first) without mutating original array
  const sortedAppointments = useMemo(
    () => [...appointments].reverse(),
    [appointments]
  );

  return (
    <div className="flex flex-col items-center gap-6 p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto overflow-hidden min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        📅 Doctor Appointments
      </h2>

      {/* Scrollable Table Container */}
      <div className="w-full bg-white border border-gray-300 rounded-lg text-sm max-h-[75vh] min-h-[60vh] overflow-y-auto shadow-md overflow-x-auto">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 py-4 px-6 border-b bg-blue-600 text-white font-semibold text-center text-sm rounded-t-lg">
          <p>#</p>
          <p className="flex items-center gap-2">
            <FaUser /> Patient
          </p>
          <p className="flex items-center gap-2">
            <FaCashRegister /> Payment
          </p>
          <p className="flex items-center gap-2">
            <FaCalendarAlt /> Age
          </p>
          <p className="flex items-center gap-2">
            <FaCalendarAlt /> Date & Time
          </p>
          <p className="flex items-center gap-2">
            <FaMoneyBillWave /> Fees
          </p>
          <p className="flex items-center gap-2">
            <FaBolt /> Action
          </p>{" "}
          {/* Action Icon */}
        </div>

        {/* Table Body */}
        {sortedAppointments.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 items-center text-gray-700 py-4 px-6 border-b hover:bg-blue-50 transition-all duration-200 text-sm"
          >
            {/* Serial Number */}
            <p className="hidden sm:block font-semibold text-gray-800">
              {index + 1}
            </p>

            {/* Patient Info */}
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full border border-gray-400 shadow-md"
                src={item.userData.image || "/default-avatar.png"}
                alt="Patient"
              />
              <p className="font-medium text-gray-900">{item.userData.name}</p>
            </div>

            {/* Payment Method */}
            <p
              className={`text-xs border px-3 py-1 rounded-full text-center font-medium uppercase ${
                item.payment
                  ? "bg-green-100 text-green-700 border-green-600"
                  : "bg-yellow-100 text-yellow-700 border-yellow-600"
              }`}
            >
              {item.payment ? "Online" : "Cash"}
            </p>

            {/* Age */}
            <p className="font-medium text-gray-800">
              {calculateAge(item.userData.dob)} yrs
            </p>

            {/* Date & Time */}
            <p className="flex items-center gap-2 text-blue-700 font-semibold text-sm">
              <FaCalendarAlt /> {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fees */}
            <p className="flex items-center gap-2 text-green-700 font-semibold text-sm">
              <FaMoneyBillWave /> {currency} {item.amount}
            </p>

            {/* Actions */}
            {item.cancelled ? (
              <p className="text-red-500 text-xs font-bold flex items-center gap-2">
                <FaTimesCircle /> Cancelled
              </p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-bold flex items-center gap-2">
                <FaCheckCircle /> Completed
              </p>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="flex items-center gap-1 text-red-600 border border-red-500 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition duration-200"
                >
                  <FaTimesCircle /> Cancel
                </button>

                <button
                  onClick={() => completeAppointment(item._id)}
                  className="flex items-center gap-1 text-green-600 border border-green-500 px-3 py-1 rounded-lg hover:bg-green-500 hover:text-white transition duration-200"
                >
                  <FaCheckCircle /> Complete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
