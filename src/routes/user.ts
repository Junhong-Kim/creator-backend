import { Router } from "express";
import * as userController from "../controllers/user";
import authMiddleware from "../middlewares/auth";

const router = Router();

router.get("/me", authMiddleware, userController.userMe);

export default router;
