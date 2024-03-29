import express from "express";
const { Router } = express; // Menggunakan destructuring untuk mengimpor Router
import {
  create,
  findAll,
  findOne,
  update,
  deleteCategory,
} from "../controllers/Category.js";

// Define routes
const router = Router(); // Menggunakan Router yang sudah diimpor
router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);
router.put("/:id", update);
router.delete("/:id", deleteCategory);

export default router; // Export default router
