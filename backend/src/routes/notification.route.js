import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getNotifications, deleteNotifications } from "../controllers/notification.controller.js";

const router = Router();

router.get("/", protectRoute, getNotifications);

router.delete("/delete", protectRoute, deleteNotifications);

export default router;