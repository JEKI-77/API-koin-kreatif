import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Category = sequelize.define("Category", {
  category: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
});

sequelize.sync();

export { Category };
