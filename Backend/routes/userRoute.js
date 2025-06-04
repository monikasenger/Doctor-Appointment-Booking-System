import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  markAsPaid,
  checkPaymentStatus,
} from "../controllers/userController.js";

import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";
import checkAuth from "../middlewares/checkAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected routes require authUser middleware to verify JWT and set req.userId
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile", authUser, upload.single("image"), updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/mark-paid", authUser, markAsPaid);

// Check payment status routes
// Here, choose one route to avoid redundancy; ideally with appointmentId param:
userRouter.get("/payment-status/:appointmentId", authUser, checkPaymentStatus);
// Or if you want to keep this too:
// userRouter.get("/check-payment-status", checkAuth, checkPaymentStatus);

export default userRouter;

