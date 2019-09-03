import express from "express";
import { IPostComment } from "../interfaces";
import models from "../models";
import * as db from "../util/db";

export function create(req: express.Request, res: express.Response, next: express.NextFunction) {
  const data = {
    contents: req.body.contents,
    userId: req.body.userId,
    postId: req.params.postId
  };

  db.create(models.PostComment, data)
    .then((data: IPostComment) => {
      res.send({
        success: true,
        data,
      });
  });
}

export function list(req: express.Request, res: express.Response, next: express.NextFunction) {
  models.PostComment.findAll({
    where: {
      postId: req.params.postId,
    },
    include: [
      models.User,
    ],
  }).then((data: IPostComment[]) => {
    res.send({
      success: true,
      data,
    });
  });
}

export function update(req: express.Request, res: express.Response, next: express.NextFunction) {
  const data = {
    contents: req.body.contents,
  };

  db.update(models.PostComment, data, {
    postId: req.params.postId,
    id: req.params.commentId,
  }).then((data: IPostComment) => {
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
