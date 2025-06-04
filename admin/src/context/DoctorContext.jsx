import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [profileData, setProfileData] = useState(false);
  const [dashData, setDashData] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        { headers: { dToken } }
      );
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const markAsPaidOnline = async (appointmentId, docId) => {
  try {
    console.log("Appointment ID:", appointmentId);  // Check if the appointment ID is correct
    console.log("Doctor ID:", docId);  // Check if the doctor ID is correct
    
    if (!appointmentId || !docId) {
      throw new Error("Appointment ID or Doctor ID is missing.");
    }
    
    // Ensure both appointmentId and doctorId are passed correctly in the request body
    const { data } = await axios.post(
      backendUrl + "/api/doctor/paid-online",
      { appointmentId, docId },  // Send doctorId as part of the request body
      { headers: { dToken } }  // Pass token in Authorization header
    );
  
    if (data.success) {
      toast.success(data.message);
      getAppointments();
      
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log("Error:", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

  
  
  
  
  

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } });
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    getAppointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
    markAsPaidOnline, // ✅ New function added
    getDashData,
    dashData,
    setDashData,
    setProfileData,
    getProfileData,
    profileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
