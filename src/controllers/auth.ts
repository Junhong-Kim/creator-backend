import express from "express";
import passport from "passport";

export const local = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/api/auth/login_status"
});

export const google = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/plus.login",
    "email"
  ]
});

export const googleCallback = passport.authenticate("google", {
  session: false,
  // successRedirect: "/",
  failureRedirect: "/api/auth/login_status"
});

export function loginStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.user) {
    res.send("logined");
  } else {
    res.send("not logined");
  }
}

export function logout(req: express.Request, res: express.Response, next: express.NextFunction) {
  req.logout();
  req.session.destroy(function(err: Error) {
    res.send("logouted");
  });
}
