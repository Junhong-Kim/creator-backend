import authRouter from "./routes/auth";
import bodyParser from "body-parser";
import createError from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import logger from "morgan";
import session from "express-session";
import path from "path";
import passport from "passport";
import passportLocal from "passport-local";
import passportGoogle from "passport-google-oauth";
import google from "./config/google.json";
import connectRedis from "connect-redis";
import models from "./models";
const RedisStore = connectRedis(session);
const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;
const sequelize = models.sequelize;

const app = express();
sequelize.sync({ force: true });

// * middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({
    host: "127.0.0.1",
    port: 6379,
  }),
  cookie: {
    path: "/",
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 1,
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "../static")));

interface IUser {
  username: string;
  password: string;
}

const User: IUser = {
  username: "test",
  password: "test",
};

passport.serializeUser(function(user: IUser, done) {
  // 로그인 성공시 호출됨, 두 번째 인자는 식별자
  done(undefined, user.username);
});

passport.deserializeUser(function(id: number, done) {
  // 두 번째 인자가 request 객체의 user로 전달됨
  done(undefined, User);
});

// * Local Strategy
passport.use(new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  function(username: string, password: string, done) {
    if (username === User.username) {
      if (password === User.password) {
        return done(undefined, User);
      } else {
        return done(undefined, false, { message: "incorrect password" });
      }
    } else {
      return done(undefined, false, { message: "invalid username" });
    }
  })
);

// * Google Strategy
passport.use(new GoogleStrategy(
  {
    clientID: google.web.client_id,
    clientSecret: google.web.client_secret,
    callbackURL: google.web.redirect_uris[0]
  },
  function(accessToken, refreshToken, profile, done) {
    const username = profile.emails[0].value;
    const googleId = profile.id;
    const user = { username, googleId };
    return done(undefined, user);
  })
);

// * routes
app.set("port", process.env.PORT || 3000);
app.get("/", function(req: Request, res: Response, next: NextFunction) {
  res.sendFile(path.join(__dirname, "../static", "index.hmtl"));
});
app.use("/api/auth", authRouter(passport));

// * error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send(err);
});

export default app;
