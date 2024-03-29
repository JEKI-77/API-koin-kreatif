import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Transaction = sequelize.define("Transaction", {
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
    type: DataTypes.DATE, // Perbaikan: Ubah tipe data menjadi DATE
  },
});

sequelize.sync();

export { Transaction };
