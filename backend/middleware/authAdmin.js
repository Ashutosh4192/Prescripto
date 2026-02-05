// import jwt from "jsonwebtoken";

// // admin authentication middleware
// const authAdmin = async (req, res, next) => {
//   try {
//     const { atoken } = req.headers.authorization;
//     if (!atoken) {
//       console.log("Below is atoken");
//       console.log(atoken);
//       return res.json({
//         success: false,
//         message: "Not Authorized Login Again",
//       });
//     }
//     const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
//     if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//       return res.json({
//         success: false,
//         message: "Not Authorized Login Again",
//       });
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // export default authAdmin;
import jwt from "jsonwebtoken";

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      console.log("token not found");
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again.",
      });
    }

    // Check if user is admin (assuming the payload contains role: 'admin')
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next(); // Proceed to the next middleware/route
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Token may be expired or invalid.",
    });
  }
};

export default authAdmin;
