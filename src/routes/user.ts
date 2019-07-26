import { Router } from "express";
import * as userController from "../controllers/user";

const router = Router();

router.get("/me", userController.userMe);

export default router;
