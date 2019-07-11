import { Router } from "express";
import * as testController from "./controllers/test";

const router = Router();

router.get("/api/test/", testController.list);

export default router;
