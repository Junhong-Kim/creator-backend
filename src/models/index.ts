import { Sequelize, Dialect } from "sequelize";
import channel from "../models/channel";
import user from "../models/user";
import userLog from "../models/userLog";
import post from "../models/post";
import postLike from "../models/postLike";
import comment from "../models/comment";
import config from "../config/config.json";
const dbConfig = config["development"];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect as Dialect,
    timezone: "+09:00",
  }
);
const db = {} as any;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// * define models
db.Channel = channel(sequelize, Sequelize);
db.User = user(sequelize, Sequelize);
db.UserLog = userLog(sequelize, Sequelize);
db.Post = post(sequelize, Sequelize);
db.PostLike = postLike(sequelize, Sequelize);
db.Comment = comment(sequelize, Sequelize);

// * define relations
db.UserLog.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
    unique: true,
  },
  onDelete: "CASCADE",
});
db.Post.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.PostLike.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.PostLike.belongsTo(db.Post, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Comment.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Comment.belongsTo(db.Post, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

export default db;
