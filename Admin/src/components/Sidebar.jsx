import React, { useContext } from "react";
import { AdminContext } from "../context/adminContext";

import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-4 py-3 px-6 w-50 rounded-xl transition-all duration-300
    ${
      isActive
        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md scale-105"
        : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-100 hover:text-black hover:scale-105"
    }`;

  return (
    <div className="flex h-screen w-70 bg-white/30 backdrop-blur-lg shadow-lg p-6 relative">
      <div className="flex flex-col w-full gap-4">
        {aToken && (
          <ul className="text-[#515151] space-y-3 mt-5">
            <NavLink className={linkClasses} to="/admin-dashboard">
              <img src={assets.home_icon} alt="Dashboard" className="w-7 h-7" />
              <p className="text-lg hidden md:block">Dashboard</p>
            </NavLink>

            <NavLink className={linkClasses} to="/all-appointments">
              <img src={assets.appointment_icon} alt="Appointments" className="w-7 h-7" />
              <p className="text-lg hidden md:block">Appointments</p>
            </NavLink>

            <NavLink className={linkClasses} to="/add-doctor">
              <img src={assets.add_icon} alt="Add Doctor" className="w-7 h-7" />
              <p className="text-lg hidden md:block">Add Doctor</p>
            </NavLink>

            <NavLink className={linkClasses} to="/doctor-list">
              <img src={assets.people_icon} alt="Doctor List" className="w-7 h-7" />
              <p className="text-lg hidden md:block">Doctor List</p>
            </NavLink>
          </ul>
        )}

        {dToken && (
          <ul className="text-[#515151] space-y-3 mt-5">
            <NavLink className={linkClasses} to="/doctordashboard">
              <img src={assets.home_icon} alt="Dashboard" className="w-7 h-7" />
              <p className="text-lg hidden md:block">Dashboard</p>
            </NavLink>

            <NavLink className={linkClasses} to="/doctor-appointments">
              <img src={assets.appointment_icon} alt="Appointments" className="w-7 h-7" />
              <p className="text-lg hidden md:block">Appointments</p>
            </NavLink>

            <NavLink className={linkClasses} to="/doctor-profile">
              <img src={assets.people_icon} alt="Profile" className="w-7 h-7" />
              <p className="text-lg hidden md:block">Profile</p>
            </NavLink>
          </ul>
        )}
      </div>

      {/* Floating Glow Effects */}
      <div className="absolute top-10 left-[-50px] w-24 h-24 bg-blue-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-[-50px] w-24 h-24 bg-purple-400/30 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Sidebar;
