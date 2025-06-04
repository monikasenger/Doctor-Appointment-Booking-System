import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/adminContext";
import { toast } from "react-toastify";
import { FaUserMd, FaEnvelope, FaKey, FaBriefcase,  FaRupeeSign, FaHospitalSymbol, FaGraduationCap, FaMapMarkerAlt, FaFileAlt } from "react-icons/fa";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) return toast.error("Image Not Selected");

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // Console log form data
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);

        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setAddress1('')
        setAddress2('')
        setAbout('')
        setFees('')

      } else {
        toast.error(data.message);
      }
    } catch (error) {
     
      toast.error(error.message);
      console.log(error);
      
    }
  };


  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-gray-100">
      <form onSubmit={onSubmitHandler} className="w-full max-w-2xl sm:max-w-3xl bg-white p-5 rounded-lg shadow-lg border border-gray-200 space-y-4">
        
        {/* Title */}
        <h2 className="text-xl sm:text-3xl font-bold text-center text-blue-600">
          ➕ Add Doctor
        </h2>

        {/* Doctor Image Upload */}
        <div className="flex flex-col items-center space-y-2">
          <label htmlFor="doc-img" className="cursor-pointer hover:scale-105 transition">
          <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full border border-blue-500 shadow-md"
            />
          </label>
          <input type="file" id="doc-img" onChange={(e) => setDocImg(e.target.files[0])} hidden />
          <p className="text-gray-500 text-xs sm:text-sm">Upload Picture</p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Doctor Name */}
          <div>
            <p className="flex items-center gap-1 text-gray-700 text-xs sm:text-sm font-medium">
              <FaUserMd className="text-blue-600" /> Doctor Name
            </p>
            <input type="text" placeholder="Enter Doctor Name" onChange={(e) => setName(e.target.value)} value={name}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" required />
          </div>

          {/* Doctor Email */}
          <div>
            <p className="flex items-center gap-1 text-gray-700 text-xs sm:text-sm font-medium">
              <FaEnvelope className="text-blue-600" /> Doctor Email
            </p>
            <input type="email" placeholder="Enter Doctor Email" onChange={(e) => setEmail(e.target.value)} value={email}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" required />
          </div>

          {/* Password */}
          <div>
            <p className="flex items-center gap-1 text-gray-700 text-xs sm:text-sm font-medium">
              <FaKey className="text-blue-600" /> Password
            </p>
            <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" required />
          </div>

          {/* Experience */}
          <div>
            <p className="flex items-center gap-1 text-gray-700 text-xs sm:text-sm font-medium">
              <FaBriefcase className="text-blue-600" /> Experience
            </p>
            <select onChange={(e) => setExperience(e.target.value)} value={experience}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} year`}>{`${i + 1} Year`}</option>
              ))}
            </select>
          </div>

          {/* Consultation Fee */}
          <div>
            <p className="flex items-center gap-1 text-gray-700 text-xs sm:text-sm font-medium">
              <FaRupeeSign className="text-blue-600" /> Consultation Fee
            </p>
            <input type="number" placeholder="Enter Fee" onChange={(e) => setFees(e.target.value)} value={fees}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" required />
          </div>

          {/* Speciality */}
          <div>
            <p className="flex items-center gap-1 text-gray-700 text-xs sm:text-sm font-medium">
              <FaHospitalSymbol className="text-blue-600" /> Speciality
            </p>
            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
              {["General Physician", "Gynecologist", "Dermatologist", "Pediatrician", "Neurologist", "Gastroenterologist"].map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Education */}
          <div>
            <p className="flex items-center gap-1 text-gray-700 text-xs sm:text-sm font-medium">
              <FaGraduationCap className="text-blue-600" /> Education
            </p>
            <input type="text" placeholder="Enter Education" onChange={(e) => setDegree(e.target.value)} value={degree}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" required />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <p className="flex items-center gap-1 text-gray-700 text-xs sm:text-sm font-medium">
              <FaMapMarkerAlt className="text-blue-600" /> Address
            </p>
            <input type="text" placeholder="Address Line 1" onChange={(e) => setAddress1(e.target.value)} value={address1}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" required />
            <input type="text" placeholder="Address Line 2" onChange={(e) => setAddress2(e.target.value)} value={address2}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" required />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className="w-3/4 sm:w-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 rounded-lg shadow-md text-sm font-semibold uppercase tracking-wide transition transform hover:scale-105 active:scale-95">
            👨‍⚕️ Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;