import express from "express";

export function userMe(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.send({
    success: true,
    data: req.user
  });
}
