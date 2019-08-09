import { Router } from "express";
import * as youtubeController from "../controllers/youtube";

const router = Router();

router.post("/channels", youtubeController.registChannel);
router.get("/channels", youtubeController.searchChannels);

export default router;
