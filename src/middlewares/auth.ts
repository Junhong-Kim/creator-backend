import express from "express";
import jwt from "jsonwebtoken";
import secrets from "../config/secrets.json";

const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token: string = req.headers["x-access-token"] as string;
  const secret: string = secrets.jwt.secret;

  if (!token) {
    return res.status(403).send({
      success: false,
      message: "login required",
    });
  }

  function onError(error: Error) {
    res.send({
      success: false,
      message: error.message,
    });
  }

  (function verifyToken(token: string) {
    jwt.verify(token, secret,
      (err: Error, decodeData: Object) => {
        if (err) onError(err);
        req.user = decodeData;
        next();
      }
    );
  })(token);
};

export default authMiddleware;
