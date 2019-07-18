import { Sequelize } from "sequelize";

export default function(sequelize: Sequelize, DataTypes: any) {
  return sequelize.define("userLog", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    loginAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    loginStatus: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "active",
    },
  }, {
    tableName: "user_log",
    timestamps: false,
  });
}
