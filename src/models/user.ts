import { Sequelize } from "sequelize";

export default function(sequelize: Sequelize, DataTypes: any) {
  return sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    googleId: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
    },
  }, {
    tableName: "user",
    timestamps: false,
  });
}
