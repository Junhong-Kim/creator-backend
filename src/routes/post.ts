import { Router } from "express";
import * as postController from "../controllers/post";

const router = Router();

router.post("/", postController.create);
router.get("/", postController.list);
router.get("/:id", postController.detail);

export default router;
