import { Sequelize } from "sequelize";

export default function(sequelize: Sequelize, DataTypes: any) {
  return sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    contents: {
      type: DataTypes.TEXT
    },
    likeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dislikeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    tableName: "post",
    deletedAt: "deletedAt",
    paranoid: true
  });
}
