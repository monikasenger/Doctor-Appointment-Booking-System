import React, { useContext, useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);

  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-1">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-8 bg-white border rounded-2xl shadow-xl text-gray-700"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <span className="text-lg text-center text-gray-600">
          {state === "Sign Up" ? "Sign up" : "Log in"} to book an appointment
        </span>

        {state === "Sign Up" && (
          <>
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <div className="flex items-center border rounded-lg p-2 bg-gray-50">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-transparent outline-none"
                  placeholder="Enter your name"
                />
              </div>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium">Email</label>
          <div className="flex items-center border rounded-lg p-2 bg-gray-50">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="flex items-center border rounded-lg p-2 bg-gray-50">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent outline-none"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <p className="text-center text-sm">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}
          <span
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="text-blue-600 cursor-pointer hover:underline ml-1"
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
