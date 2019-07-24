import { Router } from "express";
import * as authController from "../controllers/auth";
import passport from "passport";

const router = Router();

export default function(passport: passport.PassportStatic) {
  router.post("/local", authController.local);
  router.get("/google", authController.google);
  router.get("/google/callback", authController.googleCallback);
  router.get("/login_status", authController.loginStatus);
  router.get("/logout", authController.logout);

  return router;
}
