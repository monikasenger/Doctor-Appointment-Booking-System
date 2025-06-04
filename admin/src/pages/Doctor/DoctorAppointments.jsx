import React, { useContext, useEffect, useMemo, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/appContext";
import {
  FaUser,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaTimesCircle,
  FaCheckCircle,
  FaCashRegister,
  FaBolt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    markAsPaidOnline,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  const sortedAppointments = useMemo(() => [...appointments].reverse(), [appointments]);

  const openPaymentModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPaymentModal(true);
  };

  const confirmPayment = async () => {
    if (selectedAppointment) {
      await markAsPaidOnline(selectedAppointment._id, selectedAppointment.docId);
      setShowPaymentModal(false);
      getAppointments();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">📅 Doctor Appointments</h2>

      {/* Payment Modal */}
      {showPaymentModal &&  selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center w-96">
            <h3 className="text-xl font-bold mb-4 text-green-700">Pay Online</h3>
            <p className="mb-2">Appointment ID: <b>{selectedAppointment._id}</b></p>
            <p className="mb-2">  <img
              className="w-14 h-14 mx-auto rounded-full border border-gray-400 shadow-md"
              src={selectedAppointment.userData.image || "/default-avatar.png"}
              alt={selectedAppointment.userData.name}
            /></p>
            <p className="mb-2">Patient Name: <b>{selectedAppointment.userData.name}</b></p>
            <p className="mb-2">Patient Age: <b>{calculateAge(selectedAppointment.userData.dob)}</b></p>
           <p className="mb-2">Appointment Date & Time: <b>{slotDateFormat(selectedAppointment.slotDate)},{selectedAppointment.slotTime}</b></p>
          
            <p className="mb-4">Amount: <b>{currency} {selectedAppointment.amount}</b></p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmPayment}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Table */}
      <div className="w-full bg-white border border-gray-300 rounded-lg text-sm max-h-[75vh] overflow-y-auto shadow-md">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 py-4 px-6 border-b bg-blue-600 text-white font-semibold text-center text-sm rounded-t-lg">
          <p>#</p>
          <p className="flex items-center gap-2"><FaUser /> Patient</p>
          <p className="flex items-center gap-2"><FaCashRegister /> Payment</p>
          <p className="flex items-center gap-2"><FaCalendarAlt /> Age</p>
          <p className="flex items-center gap-2"><FaCalendarAlt /> Date & Time</p>
          <p className="flex items-center gap-2"><FaMoneyBillWave /> Fees</p>
          <p className="flex items-center gap-2"><FaBolt /> Action</p>
        </div>

        {sortedAppointments.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 items-center text-gray-700 py-4 px-6 border-b hover:bg-blue-50 transition-all duration-200 text-sm"
          >
            <p className="hidden sm:block font-semibold">{index + 1}</p>

            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full border border-gray-400 shadow-md"
                src={item.userData.image || "/default-avatar.png"}
                alt="Patient"
              />
              <p className="font-medium">{item.userData.name}</p>
            </div>

            <p className={`text-xs border px-3 py-1 rounded-full text-center font-medium uppercase ${item.payment ? "bg-green-100 text-green-700 border-green-600" : "bg-yellow-100 text-yellow-700 border-yellow-600"}`}>
              {item.payment ? "Online" : "Cash"}
            </p>

            <p className="font-medium">{calculateAge(item.userData.dob)} yrs</p>
            <p className="flex items-center gap-2 text-blue-700 font-semibold text-sm">
              <FaCalendarAlt /> {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p className="flex items-center gap-2 text-green-700 font-semibold text-sm">
              <FaMoneyBillWave /> {currency} {item.amount}
            </p>

            {item.cancelled ? (
              <p className="text-red-500 text-xs font-bold flex items-center gap-2">
                <FaTimesCircle /> Cancelled
              </p>
            ) : item.payment ? (
              <p className="text-blue-500 text-xs font-bold flex items-center gap-2">
                <FaCheckCircle /> Paid Online
              </p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-bold flex items-center gap-2">
                <FaCheckCircle /> Completed
              </p>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="flex items-center gap-1 text-red-600 border border-red-500 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white"
                >
                  <FaTimesCircle /> Cancel
                </button>
                <button
                  onClick={() => completeAppointment(item._id)}
                  className="flex items-center gap-1 text-green-600 border border-green-500 px-3 py-1 rounded-lg hover:bg-green-500 hover:text-white"
                >
                  <FaCheckCircle /> Complete
                </button>
                <button
                  onClick={() => openPaymentModal(item)}
                  className="flex items-center gap-1 text-blue-600 border border-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white"
                >
                  <FaCheckCircle /> Paid Online
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
