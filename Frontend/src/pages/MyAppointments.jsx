import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const datearray = slotDate.split("_");
    return (
      datearray[0] + " " + months[Number(datearray[1])] + " " + datearray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.order_id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log("Payment Successful:", response);

        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">My Appointments</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm flex flex-col items-center sm:items-start"
          >
            {/* Doctor Image */}
            <div className="w-24 h-24 mb-4">
              <img
                src={item.docData.image}
                alt={item.name}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>

            {/* Doctor Details */}
            <div className="text-center sm:text-left w-full">
              <p className="text-lg font-semibold">{item.docData.name}</p>
              <p className="text-sm text-gray-600">{item.docData.speciality}</p>
              <p className="text-sm text-black">Address:-</p>
              <p className="text-sm text-gray-600">
                {item.docData.address.line1}
              </p>
              <p className="text-sm text-gray-600">
                {item.docData.address.line2}
              </p>
              <p className="text-sm text-blue-600 font-medium">
                <span className="font-semibold">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 w-full mt-4">
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">Paid</button>
              )}
              {!item.cancelled &&  !item.payment && !item.isCompleted &&(
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full"
                  onClick={() => cancelAppointment(item._id)}
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <button className="sm:min-w-48 border border-red-500 text-red-500  px-4 py-2 rounded">
                  Appointment Cancelled
                </button>
              )}
              {
                item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border rounded text-green-500 bg-green-100">
                    Completed
                  </button>
                )
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
