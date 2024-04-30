// Import Sequelize dan konfigurasi koneksi database
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Definisikan model User
const User = sequelize.define(
  "user",
  {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true, // Memastikan format email yang benar
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true } // Menyertakan atribut timestamps createdAt dan updatedAt
);

sequelize.sync();

export default User;
