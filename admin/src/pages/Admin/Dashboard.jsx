import React, { useContext, useEffect } from "react";

import { AppContext } from "../../context/appContext";
import {
  FaUserMd,
  FaCalendarCheck,
  FaUserInjured,
  FaList,
  FaTimesCircle,FaCheckCircle
} from "react-icons/fa";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { slotDateFormat } = useContext(AppContext);
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        {/* Dashboard Stats */}
        <div className="flex flex-wrap gap-5">
          <DashboardCard
            icon={<FaUserMd className="text-blue-600 text-4xl" />}
            count={dashData.doctors}
            label="Doctors"
          />
          <DashboardCard
            icon={<FaCalendarCheck className="text-green-600 text-4xl" />}
            count={dashData.appointments}
            label="Appointments"
          />
          <DashboardCard
            icon={<FaUserInjured className="text-red-600 text-4xl" />}
            count={dashData.patients}
            label="Patients"
          />
        </div>

        {/* Latest Appointments */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-10">
          <div className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white font-semibold">
            <FaList className="text-lg" />
            <p>Latest Bookings</p>
          </div>

          <div className="divide-y">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-4 gap-4 hover:bg-gray-100 transition-all"
                key={index}
              >
                <img
                  className="rounded-full w-12 border shadow-sm"
                  src={item.docData.image}
                  alt="Doctor"
                />

                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-semibold">
                    {item.docData.name}
                  </p>
                  <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>

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
                    className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-all"
                  >
                    <FaTimesCircle /> Cancel
                  </button>
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
const DashboardCard = ({ icon, count, label }) => {
  return (
    <div className="flex items-center gap-4 bg-white shadow-md p-5 min-w-52 rounded-lg border border-gray-200 cursor-pointer hover:scale-105 transition-all">
      {icon}
      <div>
        <p className="text-2xl font-bold text-gray-700">{count}</p>
        <p className="text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default Dashboard;
