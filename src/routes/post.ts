import { Router } from "express";
import * as postController from "../controllers/post";
import * as postCommentController from "../controllers/postComment";
import authMiddleware from "../middlewares/auth";

const router = Router();

// post
router.post("/", authMiddleware, postController.create);
router.get("/", postController.list);
router.get("/:id", postController.detail);
router.put("/:id", authMiddleware, postController.update);
router.delete("/:id", authMiddleware, postController.destroy);

// post_like
router.get("/:id/like", postController.likeList);
router.put("/:id/like", postController.like);

// post_comment
router.post("/:postId/comments", postCommentController.create);
router.get("/:postId/comments", postCommentController.list);
router.put("/:postId/comments/:commentId", postCommentController.update);
router.delete("/:postId/comments/:commentId", postCommentController.destroy);

export default router;
