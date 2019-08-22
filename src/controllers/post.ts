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

export function list(req: express.Request, res: express.Response, next: express.NextFunction) {
  const offset: number = parseInt(req.query.offset);
  const limit: number = parseInt(req.query.limit);

  db.findAll(models.Post, offset, limit)
    .then((data: object[]) => {
      res.send({
        success: true,
        data
      });
    })
    .catch((err: string) => {
      res.status(500).send({
        success: false,
        message: err.toString(),
      });
    });
}
