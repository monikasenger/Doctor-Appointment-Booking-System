import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const location = useLocation();

  const paymentStatusFromNavigate = location.state?.paymentStatus?.toLowerCase();
  const appointmentIdFromNavigate = location.state?.appointmentId;

  const months = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const slotDateFormat = (slotDate) => {
    const datearray = slotDate.split("_");
    return `${datearray[0]} ${months[Number(datearray[1])]} ${datearray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Appointment Cancelled");
        setAppointments((appointments) =>
          appointments.map((item) =>
            item._id === appointmentId ? { ...item, cancelled: true } : item
          )
        );
      } else {
        toast.error("Failed to cancel appointment");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  const filteredAppointments = appointments.filter((item) => {
    let isPaymentDone = item.payment;
    if (
      paymentStatusFromNavigate === "pending" &&
      appointmentIdFromNavigate === item._id
    ) {
      isPaymentDone = false;
    }

    if (filter === "paid") return isPaymentDone && !item.cancelled;
    if (filter === "pending") return !isPaymentDone && !item.cancelled && !item.isCompleted;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">My Appointments</h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {["all", "paid", "pending"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded ${
              filter === type
                ? type === "paid"
                  ? "bg-green-500 text-white"
                  : type === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAppointments.map((item, index) => {
          let isPaymentDone = item.payment;
          if (
            paymentStatusFromNavigate === "pending" &&
            appointmentIdFromNavigate === item._id
          ) {
            isPaymentDone = false;
          }

          return (
            <div key={index} className="p-4 border rounded-lg shadow-sm flex flex-col">
              <img
                src={item.docData.image}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover mb-4"
              />
              <p className="text-lg font-semibold">{item.docData.name}</p>
              <p className="text-sm text-gray-600">{item.docData.speciality}</p>
              <p className="text-sm">Address: {item.docData.address.line1}, {item.docData.address.line2}</p>
              <p className="text-sm text-blue-600 mt-1 font-medium">
                <span className="font-semibold">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>

              <div className="flex flex-col gap-2 mt-4">
                {!item.cancelled && isPaymentDone && (
                  <button className="py-2 border rounded text-blue-500 bg-blue-100">
                    Online Paid
                  </button>
                )}
                {!item.cancelled && !isPaymentDone && !item.isCompleted && (
                  <button
                    onClick={() =>
                      navigate("/payment", {
                        state: {
                          appointmentId: item._id,
                          doctorName: item.docData.name,
                          doctorSpeciality: item.docData.speciality,
                          doctorImage: item.docData.image,
                          appointmentDate: slotDateFormat(item.slotDate),
                          appointmentTime: item.slotTime,
                          amount: item.fee ,
                        },
                      })
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && !isPaymentDone && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && (
                  <span className="text-red-500 border border-red-500 bg-red-100 px-4 py-2 rounded text-center">
                    Appointment Cancelled
                  </span>
                )}
                {item.isCompleted && !isPaymentDone && (
                  <span className="text-green-500 border border-green-500 bg-green-100 px-4 py-2 rounded text-center">
                    Completed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
