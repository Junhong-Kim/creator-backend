import express from "express";
import models from "../models";
import * as db from "../util/db";

export function create(req: express.Request, res: express.Response, next: express.NextFunction) {
  const data: {title: string; contents: string; userId: number} = req.body;

  db.create(models.Post, data)
    .then((data: object) => {
      res.send({
        success: true,
        data,
      });
    });
}
