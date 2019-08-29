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
  }, {
    tableName: "post",
    deletedAt: "deletedAt",
    paranoid: true
  });
}
