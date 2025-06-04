import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl, token } = useContext(AppContext);

  const {
    appointmentId,
    doctorName,
    doctorSpeciality,
    doctorImage,
    appointmentDate,
    appointmentTime,
    amount,
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate("/my-appointments", {
      state: { paymentStatus: "Pending", appointmentId },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    switch (paymentMethod) {
      case "Credit Card": {
        const { cardNumber, expiry, cvv } = paymentDetails;
        return (
          cardNumber?.length === 16 &&
          /^[0-9]{2}\/[0-9]{2}$/.test(expiry) &&
          cvv?.length === 3
        );
      }
      case "UPI":
        return !!paymentDetails.upiId;
      case "Net Banking": {
        const {
          bank,
          accountNumber,
          netBankingUserId,
          netBankingPassword,
          transactionPin,
        } = paymentDetails;
        return (
          bank &&
          accountNumber?.length >= 6 &&
          netBankingUserId &&
          netBankingPassword &&
          transactionPin?.length === 6
        );
      }
      case "Wallet":
        return (
          paymentDetails.wallet &&
          paymentDetails.walletMobile?.length === 10
        );
      default:
        return false;
    }
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (!validateInputs()) {
      toast.error("Please fill valid payment details");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/mark-paid`,
        {
          appointmentId,
          amount,
          paymentMethod,
          paymentDetails,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success(`₹${amount} paid successfully via ${paymentMethod}`);
        setTimeout(() => {
          navigate("/my-appointments", { state: { refresh: true } });
        }, 1000);
      } else {
        toast.error(data.message || "Payment failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "Credit Card":
        return (
          <div className="mt-4 space-y-3">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number (16 digits)"
              maxLength={16}
              value={paymentDetails.cardNumber || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="expiry"
              placeholder="Expiry Date (MM/YY)"
              maxLength={5}
              value={paymentDetails.expiry || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="password"
              name="cvv"
              placeholder="CVV (3 digits)"
              maxLength={3}
              value={paymentDetails.cvv || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        );

      case "UPI":
        return (
          <div className="mt-4">
            <input
              type="text"
              name="upiId"
              placeholder="Enter UPI ID"
              value={paymentDetails.upiId || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        );

      case "Net Banking":
        return (
          <div className="mt-4 space-y-3">
            <select
              name="bank"
              value={paymentDetails.bank || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Bank</option>
              <option value="HDFC">HDFC Bank</option>
              <option value="SBI">State Bank of India</option>
              <option value="ICICI">ICICI Bank</option>
              <option value="Axis">Axis Bank</option>
            </select>
            {paymentDetails.bank && (
              <>
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Account Number"
                  maxLength={18}
                  value={paymentDetails.accountNumber || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="text"
                  name="netBankingUserId"
                  placeholder="User ID"
                  value={paymentDetails.netBankingUserId || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="password"
                  name="netBankingPassword"
                  placeholder="Password"
                  value={paymentDetails.netBankingPassword || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="password"
                  name="transactionPin"
                  placeholder="Transaction PIN (6 digits)"
                  maxLength={6}
                  value={paymentDetails.transactionPin || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </>
            )}
          </div>
        );

      case "Wallet":
        return (
          <div className="mt-4 space-y-3">
            <select
              name="wallet"
              value={paymentDetails.wallet || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Wallet</option>
              <option value="Paytm">Paytm</option>
              <option value="PhonePe">PhonePe</option>
              <option value="GooglePay">Google Pay</option>
            </select>
            {paymentDetails.wallet && (
              <input
                type="text"
                name="walletMobile"
                placeholder="Wallet Mobile Number"
                maxLength={10}
                value={paymentDetails.walletMobile || ""}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!appointmentId) {
    return (
      <p className="text-center mt-10 text-red-500">
        No appointment selected for payment.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>

      <div className="flex gap-6 items-center mb-6">
        <img
          src={doctorImage}
          alt={doctorName}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div>
          <p className="text-xl font-semibold">{doctorName}</p>
          <p className="text-gray-600">{doctorSpeciality}</p>
          <p className="mt-2">
            <span className="font-semibold">Date & Time:</span> {appointmentDate} | {appointmentTime}
          </p>
        </div>
      </div>

      <div className="mb-6 text-lg">
        <span className="font-semibold">Amount to Pay:</span> ₹{amount}
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2">Select Payment Method:</p>
        <div className="flex flex-col gap-3">
          {["Credit Card", "UPI", "Net Banking", "Wallet"].map((method) => (
            <label key={method} className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setPaymentDetails({});
                }}
              />
              {method}
            </label>
          ))}
        </div>
        {renderPaymentForm()}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleBack}
          className="flex-1 py-3 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
        >
          Back 
        </button>
        <button
          onClick={handlePayment}
          disabled={isLoading}
          className={`flex-1 py-3 rounded text-white transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
