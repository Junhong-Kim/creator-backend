import { Sequelize, Dialect } from "sequelize";
import user from "../models/user";
import userLog from "../models/userLog";
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
db.User = user(sequelize, Sequelize);
db.UserLog = userLog(sequelize, Sequelize);

// * define relations
db.UserLog.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
    unique: true,
  },
  onDelete: "CASCADE",
});

export default db;
