import { Router } from "express";
import * as postController from "../controllers/post";

const router = Router();

router.post("/", postController.create);

export default router;
