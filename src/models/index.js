import db from "../config/database.js";
import User from "./User_model.js";
import Transaction from "./Transaction_model.js";

const user = db.define("user", User, {
  tableName: "user",
  underscored: true,
});

const transaction = db.define("Transaction", Transaction, {
  tableName: "Transaction",
  underscored: true,
});

user.hasOne(transaction, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

transaction.belongsTo(user, {
  foreignKey: "transactionId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
