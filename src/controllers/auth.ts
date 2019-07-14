import { NextFunction, Request, Response } from "express";

export const login = (req: Request, res: Response, next: NextFunction) => {
  req.session.isLogin = true;
  req.session.save(function() {
    res.send("login successed");
  });
};

export const loginStatus = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.isLogin) {
    res.send("logined");
  } else {
    res.send("logouted");
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy(function(err) {
    res.send("logout successed");
  });
};
