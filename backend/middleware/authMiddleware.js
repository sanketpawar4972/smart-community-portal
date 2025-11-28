// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// export const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     console.log("Authorization Header:", authHeader); // 🧠 Check what's received

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     console.log("Extracted Token:", token); // 🧠 Check the token content

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded JWT:", decoded); // 🧠 Check decoded data

//     req.user = await User.findById(decoded.id).select("-password");
//     if (!req.user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     next();
//   } catch (error) {
//     console.error("JWT Verification Error:", error.message);
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "No token provided" });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
