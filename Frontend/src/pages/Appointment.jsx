import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FaInfoCircle, FaCalendarCheck } from "react-icons/fa";
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors'; 
import { toast } from 'react-toastify';
import axios from 'axios';


const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol,backendUrl,token,getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');



const bookAppointment = async()=>{
  if (!token) {
    toast.warn('Login to book Appointment')
    return navigate('/login')
    
  }

  try {
    const date= docSlots[slotIndex][0].datetime
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
   
    const slotDate = day +"_"+ month + "_" + year
  const {data} = await axios.post(backendUrl + '/api/user/book-appointment', {docId,slotDate,slotTime},{headers: {token}})
if(data.success){
  toast.success(data.message)
  getDoctorsData()
  navigate('/my-appointments')
}else{
  toast.error(data.message)
}

  } catch (error) {
    console.log(error);
    toast.error(error.message)
    
  }
}



  useEffect(() => {
    if (doctors.length > 0) {
      const docInfo = doctors.find(doc => doc._id === docId);
      setDocInfo(docInfo);
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlot();
  }, [docInfo]);

  const getAvailableSlot = () => {
    setDocSlots([]);
    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day= currentDate.getDate()
        let month= currentDate.getMonth() + 1
        let year= currentDate.getFullYear()
        const slotDate = day +"_"+ month + "_" + year
        const slotTime= formattedTime
        const isSlotAvaiable= docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if(isSlotAvaiable)
{
   timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        });
}
       

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  };

  if (!docInfo) {
    return <p className="text-center text-lg text-gray-600 mt-10">Loading doctor information...</p>;
  }

  return (
    <div>
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg mt-8 border border-gray-200">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-600 hover:text-blue-500 mb-6 flex items-center gap-2 text-lg font-semibold transition duration-300"
      >
        ← Back to Doctors
      </button>

      {/* Doctor Details Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <div className="w-40 h-55 sm:w-48 sm:h-61 lg:w-56 lg:h-71">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full h-full rounded-lg shadow-md border border-gray-300 object-cover"
          />
        </div>

        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-6 w-full lg:w-auto shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {docInfo.name}
            <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" />
          </h1>

          <div className="flex items-center text-gray-600 gap-2 text-base mt-2">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <span className="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-sm shadow-sm">
              {docInfo.experience}
            </span>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
              About <FaInfoCircle className="text-blue-500" />
            </h2>
            <p className="text-gray-600 mt-2 text-sm">{docInfo.about}</p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment Fee: <span className="text-gray-900 font-semibold">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-8 ">
        <p className="text-2xl font-bold text-blue-800">Select a Booking Slot</p>

       {/* Date Selection */}
<div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2">
  {docSlots.length > 0 && docSlots.map((item, index) => (
    <button
      key={index}
      onClick={() => setSlotIndex(index)}
      className={`text-center py-4 px-3 min-w-14 rounded-full cursor-pointer text-sm font-medium transition duration-300
        ${slotIndex === index 
          ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg' 
          : 'border border-gray-300 hover:bg-gray-100'}`}
    >
      <p className="uppercase text-xs">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
      <p className="text-lg font-bold">{item[0] && item[0].datetime.getDate()}</p>
    </button>
  ))}
</div>

{/* Time Slots */}
<div className="flex items-center gap-3 mt-6 w-full overflow-x-auto">
  {docSlots.length && docSlots[slotIndex].map((item, index) => (
    <button
      key={index}
      onClick={() => setSlotTime(item.time)}
      className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer flex-shrink-0 transition duration-300
        ${slotTime === item.time 
          ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg' 
          : 'border border-gray-300 hover:bg-gray-100'}`}
    >
      {item.time}
    </button>
  ))}
</div>


<div className="flex justify-center mt-6">
  <button  onClick={bookAppointment}
    className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg 
               hover:bg-blue-700 transition duration-300 shadow-md active:scale-95 flex items-center gap-2">
    <FaCalendarCheck className="text-white text-xl" /> 
    Book an Appointment
  </button>
        </div>
      </div>
</div>
      {/* Listing Related Doctors */}
      {docInfo && <RelatedDoctors docId={docId} speciality={docInfo.speciality} />}
    </div>
  );
};

export default Appointment;
