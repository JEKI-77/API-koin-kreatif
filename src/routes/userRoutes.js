import { Router } from "express";
import userController from "../controllers/userController.js";
const { Signup, Login, Logout } = userController;
import { saveUser } from "../middlewares/userAuth.js";

const router = Router();

router.post("/signup", saveUser, Signup);
router.post("/login", Login);
router.post("/logout", Logout);

export default router;
