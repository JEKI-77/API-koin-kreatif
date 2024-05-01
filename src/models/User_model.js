// Import Sequelize dan konfigurasi koneksi database
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Transaction from "./Transaction_model.js";

// Definisikan model User
const User = sequelize.define(
  "user",
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notNull: true, // Menambahkan properti notNull
    },
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

  { tableName: "user", timestamps: true } // Menyertakan atribut timestamps createdAt dan updatedAt
);

// User.hasOne(Transaction, {
//   foreignKey: "userId",
// });

sequelize.sync();

export default User;
