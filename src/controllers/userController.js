import bcrypt from "bcrypt";
const { hash, compare } = bcrypt;
import User from "../models/User_model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Transaction from "../models/Transaction_model.js";
dotenv.config();

const Signup = async (req, res) => {
  try {
    const { userName, email, password, confPassword } = req.body;

    // Periksa kecocokan password dan confPassword
    if (password !== confPassword) {
      return res
        .status(400)
        .json({ msg: "Password dan Confirm Password tidak cocok" });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email sudah terdaftar",
        message: "Registrasi gagal, email sudah terdaftar",
      });
    }

    // Hash password sebelum menyimpannya di database
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Menyimpan pengguna ke database
    await User.create({
      userName: userName,
      email: email,
      password: hashedPassword,
    });

    // Memberikan respons sukses setelah registrasi berhasil
    res.json({ msg: "Registrasi berhasil" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

const Login = async (req, res) => {
  try {
    // Cari user berdasarkan email
    const user = await User.findOne({
      // where: { email: req.body.email },
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(401).json({ message: "Email tidak terdaftar" });
    }

    // Bandingkan kata sandi
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Kata sandi salah" });
    }

    // Generate token
    const userId = user.id;
    const userName = user.userName;
    const userEmail = user.email;

    const accessToken = jwt.sign(
      { userId, userName, userEmail },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { userId, userName, userEmail },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Simpan refresh_token ke dalam dokumen user di MongoDB
    user.refresh_token = refreshToken;

    try {
      await user.save();
      return res.status(200).json({
        msg: "Login berhasil",
        data: {
          userName: userName,
          email: userEmail,
          userId: userId,
          token: accessToken,
        },
      });
    } catch (saveError) {
      // Tangani kesalahan penyimpanan di sini
      return res.status(500).json({ error: saveError.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).send("Refresh token not provided");
    }

    // Database match
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) {
      return res.status(401).send("Invalid refresh token");
    }

    // Hapus token refresh dari database
    await user.update({ refresh_token: null });

    // Hapus cookie
    res.clearCookie("refreshToken"); // Gunakan clearCookie untuk menghapus cookie
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getTransaction = async (req, res) => {
  try {
    const currentTransaction = await User.findOne({
      where: { userId: req.user.userId },
      include: [
        {
          model: Transaction,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
    });
    if (currentTransaction) {
      // Ubah variabel dari currentUser menjadi currentTransaction
      return res.status(200).json({ data: currentTransaction });
    } else {
      return res.status(404).json({
        message: "User Tidak ditemukan",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export default {
  Signup,
  Login,
  Logout,
  getTransaction,
};
