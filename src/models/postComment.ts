import { Sequelize } from "sequelize";

export default function(sequelize: Sequelize, DataTypes: any) {
  return sequelize.define("post_comment", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    contents: {
      type: DataTypes.TEXT
    },
  }, {
    tableName: "post_comment",
    paranoid: true,
  });
}
