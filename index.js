import express from "express";
import transactionsRouter from "./src/routes/Transaction.js";
import categoryRouter from "./src/routes/Category.js";
import db from "./src/config/database.js";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import verifyToken from "./src/middlewares/privateRoute.js";
import openaiRouter from "./src/routes/openaiRoute.js";

const app = express();
const PORT = 4000;

// Middleware
app.use(
  cors({
    origin: ["https://koin-kreatif.vercel.app", "http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); // Untuk parsing body dari request dengan format JSON
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/v1/transactions", verifyToken, transactionsRouter);
app.use("/v1/category",verifyToken,categoryRouter);
app.use("/auth", userRoutes);
app.use("/openai", openaiRouter);

// Start the server
db.authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
