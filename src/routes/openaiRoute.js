// routes/openaiRoutes.js
import express from "express";
import chat from "../controllers/openaiController.js";

const router = express.Router();

router.post("/", chat);

export default router;
