import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = res.cookie("access_token", token, {
    httpOnly: true,
    secure: true, // Required for production HTTPS
    sameSite: "none", // Important for cross-domain requests
    domain: "https://realestate-o4z2.onrender.com", // Adjust based on your domain
  });

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user;
    next();
  });
};
