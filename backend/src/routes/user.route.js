import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.js"
import { registerUser, loginUser, logoutUser, getMe, getUserProfile, getSuggestedUsers, followUnfollowUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

// auth routes
router.get("/me", protectRoute, getMe);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

// other routes
router.get("/profile/:username", protectRoute, getUserProfile);

router.get("/suggested", protectRoute, getSuggestedUsers);

router.post("/follow/:id", protectRoute, followUnfollowUser);

router.post("/update", protectRoute, updateUser);

export default router;