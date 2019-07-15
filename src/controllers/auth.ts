import { NextFunction, Request, Response } from "express";

export const loginStatus = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    res.send("logined");
  } else {
    res.send("not logined");
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout();
  req.session.destroy(function(err: Error) {
    res.send("logouted");
  });
};
