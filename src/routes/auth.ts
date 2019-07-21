import express, { Router } from "express";
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
  router.get("/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/plus.login",
        "email"
      ]
    })
  );
  router.get("/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/api/auth/logout"
    }),
    function (req: express.Request, res: express.Response) {
      res.redirect("/", 301);
    }
  );
  router.get("/login_status/", authController.loginStatus);
  router.get("/logout", authController.logout);

  return router;
}
