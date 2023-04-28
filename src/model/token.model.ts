import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/instance";
import { User } from "./user.model";
export interface TokenInterface {
  id: number;
  token: string;
  user: string;
  expires: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Token = sequelize.define(
  "tokens",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires: {
      allowNull: false,
      type: DataTypes.DATE,
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);
