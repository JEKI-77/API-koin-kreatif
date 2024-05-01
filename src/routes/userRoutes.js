import { Router } from "express";
import userController from "../controllers/userController.js";
const { Signup, Login, Logout, getTransaction } = userController;
import { saveUser } from "../middlewares/userAuth.js";
import verifyToken from "../middlewares/privateRoute.js";

const router = Router();

router.post("/signup", saveUser, Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/transaction", getTransaction);

export default router;
