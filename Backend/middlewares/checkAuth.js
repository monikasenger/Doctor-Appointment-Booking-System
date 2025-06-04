// middlewares/checkAuth.js
import jwt from 'jsonwebtoken';

export default function checkAuth(req, res, next) {
  const token = req.header("token");

  if (!token)
    return res.status(401).json({ success: false, message: "Access Denied. No token provided." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
}
