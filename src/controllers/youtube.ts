import express from "express";
import secrets from "../config/secrets.json";
import { IYouTubeChannel } from "../interfaces";
import YouTube, { Channel } from "simple-youtube-api";
import models from "../models";
import * as db from "../util/db";

const youtube = new YouTube(secrets.youtube.secret);

export function registChannel(req: express.Request, res: express.Response, next: express.NextFunction) {
  const channelId = req.body.channelId;

  db.create(models.Channel, { channelId })
    .then((data: object) => {
      res.send({
        success: true,
        data,
      });
    })
    .catch(() => {
      res.status(409).send({
        success: false,
        message: "duplicated channel",
      });
    });
}

export function searchChannels(req: express.Request, res: express.Response, next: express.NextFunction) {
  const keyword = req.query.keyword;

  if (keyword) {
    youtube.searchChannels(keyword, 10)
      .then((channels: Array<Channel>) => {
        return channels.map((channel: Channel) => {
          return {
            id: channel.raw.id.channelId,
            title: channel.raw.snippet.title,
            description: channel.raw.snippet.description,
            thumbnail: channel.raw.snippet.thumbnails.high.url,
          };
        });
      })
      .then((data: Array<IYouTubeChannel>) => {
        res.send({
          success: true,
          total: data.length,
          data: data
        });
      });
  } else {
    res.send({
      success: false,
      message: "keyword is empty"
    });
  }
}
