import { Sequelize } from "sequelize";

export default function(sequelize: Sequelize, DataTypes: any) {
  return sequelize.define("postLike", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: "postLike",
  });
}
