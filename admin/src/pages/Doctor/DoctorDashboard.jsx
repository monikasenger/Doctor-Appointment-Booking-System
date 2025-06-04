import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import {
  FaMoneyBillWave,
  FaCalendarCheck,
  FaUserInjured,
  FaList,
  FaCheckCircle,
  FaTimesCircle,
  FaCreditCard,
} from "react-icons/fa";
import { AppContext } from "../../context/appContext";

const DoctorDashboard = () => {
  const {
    dToken,
    getDashData,
    dashData,
    completeAppointment,
    cancelAppointment,
    markAsPaidOnline,
  } = useContext(DoctorContext);

  const { currency, slotDateFormat, calculateAge } = useContext(AppContext);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  const openPaymentModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPaymentModal(true);
  };

  const confirmPayment = async () => {
    if (selectedAppointment) {
      await markAsPaidOnline(selectedAppointment._id, selectedAppointment.docId);
      setShowPaymentModal(false);
      getDashData();
    }
  };

  return (
    dashData && (
      <div className="m-5">

        {/* Payment Modal */}
        {showPaymentModal && selectedAppointment && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center w-96">
              <h3 className="text-xl font-bold mb-4 text-green-700">Pay Online</h3>
              <p className="mb-2">Appointment ID: <b>{selectedAppointment._id}</b></p>
              <p className="mb-2">
                <img
                  className="w-14 h-14 mx-auto rounded-full border border-gray-400 shadow-md"
                  src={selectedAppointment.userData.image || "/default-avatar.png"}
                  alt={selectedAppointment.userData.name}
                />
              </p>
              <p className="mb-2">Patient Name: <b>{selectedAppointment.userData.name}</b></p>
              <p className="mb-2">Patient Age: <b>{calculateAge(selectedAppointment.userData.dob)}</b></p>
              <p className="mb-2">Appointment Date & Time: <b>{slotDateFormat(selectedAppointment.slotDate)}, {selectedAppointment.slotTime}</b></p>
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

        {/* Dashboard Stats */}
        <div className="flex flex-wrap gap-6 justify-center">
          <DashboardCard
            icon={<FaMoneyBillWave className="text-green-600 text-4xl" />}
            value={`${currency} ${dashData.earnings}`}
            label="Earnings"
          />
          <DashboardCard
            icon={<FaCalendarCheck className="text-blue-600 text-4xl" />}
            value={dashData.appointments}
            label="Appointments"
          />
          <DashboardCard
            icon={<FaUserInjured className="text-red-600 text-4xl" />}
            value={dashData.patients}
            label="Patients"
          />
        </div>

        {/* Latest Appointments */}
        <div className="bg-white mt-10 rounded-xl shadow-lg overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 bg-gray-100 border-b">
            <FaList className="text-gray-600 text-lg" />
            <p className="font-semibold text-lg text-gray-700">Latest Bookings</p>
          </div>

          <div className="divide-y">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-4 gap-6 hover:bg-gray-50 transition-all"
              >
                <img
                  className="rounded-full w-12 h-12 border shadow-sm"
                  src={item.userData.image || "/default-avatar.png"}
                  alt="Patient"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>

                {/* Action Buttons */}
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

                    <button
                      onClick={() => openPaymentModal(item)}
                      className="flex items-center gap-1 text-blue-600 border border-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition duration-200"
                    >
                      <FaCreditCard /> Paid Online
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

// 📌 Reusable Card Component for Dashboard Stats
const DashboardCard = ({ icon, value, label }) => {
  return (
    <div className="flex items-center gap-4 bg-white shadow-md p-6 min-w-60 rounded-xl border border-gray-200 cursor-pointer hover:scale-105 transition-all hover:shadow-lg">
      {icon}
      <div>
        <p className="text-2xl font-bold text-gray-700">{value}</p>
        <p className="text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default DoctorDashboard;
