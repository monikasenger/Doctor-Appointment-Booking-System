import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserMd, FaMapMarkerAlt, FaMoneyBillWave, FaBriefcaseMedical, FaCheckCircle, FaEdit, FaSave } from "react-icons/fa";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, { headers: { dToken } });
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="flex flex-col gap-6 m-6 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <img className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg" src={profileData.image} alt="Doctor" />
          <p className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            <FaUserMd className="text-blue-500" /> {profileData.name}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <FaBriefcaseMedical className="text-red-500" /> {profileData.degree} - {profileData.speciality}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <FaCheckCircle className="text-green-500" /> {profileData.experience} Years Experience
          </p>
        </div>

        <div className="border-t border-gray-300 pt-2">
          <p className="text-lg font-medium text-gray-700">About</p>
          <p className="text-gray-600 mt-1">{profileData.about}</p>
        </div>

        <div className="border-t border-gray-300 pt-2">
          <p className="text-lg font-medium text-gray-700 flex items-center gap-2">
            <FaMoneyBillWave className="text-green-500" /> Appointment Fee:
          </p>
          <p className="text-gray-800 mt-1">
            {currency} {isEdit ? (
              <input
                type="number"
                className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setProfileData((prev) => ({ ...prev, fees: e.target.value }))}
                value={profileData.fees}
              />
            ) : (
              profileData.fees
            )}
          </p>
        </div>

        <div className="border-t border-gray-300 pt-2">
          <p className="text-lg font-medium text-gray-700 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" /> Address:
          </p>
          <p className="text-gray-800 mt-1">
            {isEdit ? (
              <input
                type="text"
                className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setProfileData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                value={profileData.address.line1}
              />
            ) : (
              profileData.address.line1
            )}
            <br />
            {isEdit ? (
              <input
                type="text"
                className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setProfileData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                value={profileData.address.line2}
              />
            ) : (
              profileData.address.line2
            )}
          </p>
        </div>

        <div className="flex gap-2 pt-2 items-center">
          <input type="checkbox" onChange={() => isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
          <label className="text-gray-700 flex items-center gap-2" >

          <span className={profileData.available ? "text-green-500" : "text-gray-500"} > Available </span>
          </label>
        </div>

        {isEdit ? (
          <button
            onClick={updateProfile}
            className="px-4 w-30 py-2 text-center bg-green-500 text-white text-sm rounded-lg mt-3 hover:bg-green-600 transition-all flex items-center gap-2"
          >
            <FaSave /> Save
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-4 w-30 py-2 text-center bg-blue-500 text-white text-sm rounded-lg mt-3 hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            <FaEdit /> Edit
          </button>
        )}
      </div>
    )
  );
};

export default DoctorProfile;