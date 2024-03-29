import jwt from "jsonwebtoken";
const { verify } = jwt;
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  // Gunakan kunci yang benar saat memverifikasi token
  verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.email = decoded.email;
    next();
  });
};

export default verifyToken;
