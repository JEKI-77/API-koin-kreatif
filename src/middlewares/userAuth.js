import express from "express";
import User from "../models/User_model.js";

const router = express.Router();

const saveUser = async (req, res, next) => {
  try {
    const { userName, email } = req.body;

    // Cek apakah username sudah ada di database
    const existingUsername = await User.findOne({ where: { userName } });
    if (existingUsername) {
      return res.status(409).send("Username already taken");
    }

    // Cek apakah email sudah ada di database
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).send("Email already taken");
    }

    // Lanjut ke middleware berikutnya jika username dan email belum ada di database
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export { router, saveUser };
