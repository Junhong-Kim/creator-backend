import { Router } from "express";
import * as youtubeController from "../controllers/youtube";

const router = Router();

router.get("/", youtubeController.searchChannels);

export default router;
