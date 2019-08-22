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

export function detail(req: express.Request, res: express.Response, next: express.NextFunction) {
  db.findOne(models.Post, {
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
