import express from "express";
import { IPost } from "../interfaces";
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

export async function list(req: express.Request, res: express.Response, next: express.NextFunction) {
  const offset: number = parseInt(req.query.offset);
  const limit: number = parseInt(req.query.limit);

  const total = await db.totalCount(models.Post)
    .then((count: number) => count);

  const data = await db.findAllWithJoin(models.Post, models.User, offset, limit)
    .then((data: object[]) => data);

  res.send({ success: true, total, data });
}

export function detail(req: express.Request, res: express.Response, next: express.NextFunction) {
  db.findOneWithJoin(models.Post, models.User, {
    id: req.params.id,
  })
  .then((data: IPost) => {
    if (data) {
      res.send({
        success: true,
        data,
      });
    } else {
      res.status(404).send({
        success: false,
      });
    }
  });
}

export function update(req: express.Request, res: express.Response, next: express.NextFunction) {
  const data = req.body;

  db.update(models.Post, data, {
    id: req.params.id,
  })
  .then((data: IPost) => {
    if (data) {
      res.send({
        success: true,
        data,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "incorrect request",
      });
    }
  });
}

export function destroy(req: express.Request, res: express.Response, next: express.NextFunction) {
  db.destroy(models.Post, {
    id: req.params.id,
  })
  .then((success: boolean) => {
    res.send({ success });
  });
}
