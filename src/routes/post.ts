import { Router } from "express";
import * as postController from "../controllers/post";
import authMiddleware from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, postController.create);
router.get("/", postController.list);
router.get("/:id", postController.detail);
router.put("/:id", authMiddleware, postController.update);
router.delete("/:id", authMiddleware, postController.destroy);

export default router;
