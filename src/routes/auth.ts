import { Router } from "express";
import * as authController from "../controllers/auth";
import passport from "passport";

const router = Router();

export default function(passport: passport.PassportStatic) {
  router.post("/login",
    passport.authenticate("local", {
      successRedirect: "/api/auth/login_status",
      failureRedirect: "/api/auth/logout"
    })
  );
  router.get("/login_status/", authController.loginStatus);
  router.get("/logout", authController.logout);

  return router;
}
