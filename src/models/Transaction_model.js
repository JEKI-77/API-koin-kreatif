import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
// import User from "./User_model.js";

const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    notNull: true,
  },
  amount: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
  date: {
    type: DataTypes.DATE,  // Perbaikan: Ubah tipe data menjadi DATE
  },
  // userId: {
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV4,
  //   references: {
  //     model: "user",
  //     key: "userId",
  //   },
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // },
});
// Definisikan relasi one-to-one antara User dan Transaction
// User.hasOne(Transaction, {
//   foreignKey: {
//     name: "userId",
//     allowNull: false,
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE",
//   },
// });

// Transaction.belongsTo(User, {
//   foreignKey: {
//     name: "userId",
//     allowNull: false,
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE",
//   },
// });

sequelize.sync();

export default Transaction;
