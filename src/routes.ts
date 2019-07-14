import { Router } from "express";
import * as authController from "./controllers/auth";

const router = Router();

router.post("/api/auth/login", authController.login);
router.get("/api/auth/login_status/", authController.loginStatus);
router.get("/api/auth/logout", authController.logout);

export default router;
