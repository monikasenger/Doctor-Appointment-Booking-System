import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import {
  FaMoneyBillWave,
  FaCalendarCheck,
  FaUserInjured,
  FaList,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { AppContext } from "../../context/appContext";

const DoctorDashboard = () => {
  const { dToken, getDashData, dashData, completeAppointment, cancelAppointment } =
    useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">
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
                  src={item.userData.image}
                  alt="Patient"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>

                {item.cancelled ? (
                  <p className="text-red-500 font-medium text-sm flex items-center gap-2">
                    <FaTimesCircle /> Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 font-medium text-sm flex items-center gap-2">
                    <FaCheckCircle /> Completed
                  </p>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-all"
                    >
                      <FaTimesCircle /> Cancel
                    </button>
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-all"
                    >
                      <FaCheckCircle /> Complete
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
