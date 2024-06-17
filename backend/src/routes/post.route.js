import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getUserPosts, getFollowingPosts, getAllPostController , getLikedPostsController, createPostController, deletePostController, commentOnPostController, likeUnlikePostController } from "../controllers/post.controller.js";

const router = Router();

router.get("/all", protectRoute, getAllPostController);

router.get("/likes/:id", protectRoute, getLikedPostsController);

router.get("/following", protectRoute, getFollowingPosts);

router.get("/user/:username", protectRoute, getUserPosts);

router.post("/create", protectRoute, createPostController);

router.post("/like/:id", protectRoute, likeUnlikePostController);

router.post("/comment/:id", protectRoute, commentOnPostController);

router.delete("/:id", protectRoute, deletePostController);

export default router;