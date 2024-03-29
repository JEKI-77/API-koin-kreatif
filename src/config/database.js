import pkg from "sequelize";
const { Sequelize } = pkg;

const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  database: "koin-kreatif",
  username: "postgres",
  password: "1234",
  port: 5433,
});

export default db; // Export objek sequelize
