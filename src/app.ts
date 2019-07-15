import createError from "http-errors";
import express, { NextFunction, Request, Response }  from "express";
import logger from "morgan";
import routes from "./routes";
import session from "express-session";
import connectRedis from "connect-redis";
const RedisStore = connectRedis(session);

const app = express();

app.use(logger("dev"));

app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({
    host: "127.0.0.1",
    port: 6379
  }),
  cookie: {
    path: "/",
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 1
  }
}));

app.set("port", process.env.PORT || 3000);
app.use("/", routes);

app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send(err);
});

export default app;
