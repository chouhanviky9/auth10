"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const sequelize_1 = require("sequelize");
const instance_1 = require("../database/instance");
const user_model_1 = require("./user.model");
exports.Token = instance_1.sequelize.define("tokens", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: user_model_1.User,
            key: "id",
        },
    },
    expires: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    timestamps: true,
});
