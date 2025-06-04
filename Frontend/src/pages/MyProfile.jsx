import React, { useContext, useState } from "react";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaVenusMars,
  FaBirthdayCake,
  FaEdit,
  FaSave,
  FaCamera,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  // Function to handle profile image change
  const updateUserProfileData = async () => {
try {
  const formData= new FormData()
  formData.append('name',userData.name)
  formData.append('phone',userData.phone)
  formData.append('address',JSON.stringify(userData.address))
  formData.append('dob',userData.dob)
  formData.append('gender',userData.gender)

  image && formData.append('image',image);
  const { data } = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}});
if(data.success){
  toast.success(data.message)
  loadUserProfileData()
  setIsEdit(false)
  setImage(false)
}else{
  toast.error(data.message)
}
} catch (error) {
  console.log(error);
  toast.error(error.message)
  
}

  };

  return (
    userData && (
      <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        {isEdit ? (
          <label htmlFor="image">
            <div className="  flex flex-col items-center relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <div className="flex flex-col items-center relative">
            <img
              src={userData.image}
              alt="Profile"
              className=" w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
            />
          </div>
        )}

        {/* Profile Image */}
        <div className="flex flex-col items-center relative">
          {isEdit ? (
            <input
              type="text"
              className="text-lg font-semibold text-center mt-2 border rounded px-2 py-1"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="text-xl font-bold mt-3">{userData.name}</p>
          )}
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Contact Information
          </h3>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-gray-700">
              <FaEnvelope className="text-blue-600" /> {userData.email}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaPhone className="text-green-600" />
              {isEdit ? (
                <input
                  type="text"
                  className="border rounded px-2 py-1"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                userData.phone
              )}
            </p>
            <p className="flex items-start gap-2 text-gray-700">
              <FaMapMarkerAlt className="text-red-600 mt-1" />
              {isEdit ? (
                <div>
                  <input
                    type="text"
                    className="border rounded px-2 py-1 mb-1 w-full"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </div>
              ) : (
                <span>
                  {userData.address.line1} <br /> {userData.address.line2}
                </span>
              )}
            </p>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Basic Information
          </h3>
          <p className="flex items-center gap-2 text-gray-700">
            <FaVenusMars className="text-purple-600" />
            {isEdit ? (
              <select
                className="border rounded px-2 py-1"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              userData.gender
            )}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaBirthdayCake className="text-pink-500" />
            {isEdit ? (
              <input
                type="date"
                className="border rounded px-2 py-1"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              userData.dob
            )}
          </p>
        </div>

        {/* Edit / Save Button */}
        <div className="flex justify-center mt-6">
          {isEdit ? (
            <button
              className="px-6 py-2 flex items-center gap-2 font-semibold rounded-lg transition-all duration-300 
            bg-green-600 hover:bg-green-700 text-white"
              onClick={updateUserProfileData}
            >
              <FaSave />
              Save Information
            </button>
          ) : (
            <button
              className="px-6 py-2 flex items-center gap-2 font-semibold rounded-lg transition-all duration-300 
bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsEdit(true)}
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
