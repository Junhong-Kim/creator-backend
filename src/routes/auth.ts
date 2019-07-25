import express, { Router } from "express";
import * as authController from "../controllers/auth";
import passport from "passport";
import { IUser } from "../interfaces";
import jwt from "jsonwebtoken";
import secrets from "../config/secrets.json";

const router = Router();

export default function(passport: passport.PassportStatic) {
  router.post("/local", authController.local);
  router.get("/google", authController.google);
  router.get("/google/callback", authController.googleCallback,
    (req: express.Request, res: express.Response) => {
      const payload: IUser = req.user;
      const secret: jwt.Secret = secrets.jwt.secret;
      const options: jwt.SignOptions = {
        expiresIn: "1d",
        subject: "userInfo",
        issuer: "creator.junhong.kim"
      };

      function genToken() {
        return new Promise((resolve, reject) => {
          jwt.sign(payload, secret, options,
            (err, token) => {
              if (err) reject(err);
              resolve(token);
            }
          );
        });
      }

      genToken()
        .then(token => {
          res.redirect(301, `/?token=${token}`);
        });
    }
  );
  router.get("/login_status", authController.loginStatus);
  router.get("/logout", authController.logout);

  return router;
}
