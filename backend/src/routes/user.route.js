import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.js"
import { registerUser, loginUser, logoutUser, getMe } from "../controllers/user.controller.js";

const router = Router();

router.get("/me", protectRoute, getMe);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

export default router;