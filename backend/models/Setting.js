import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Setting = sequelize.define("Setting", {
    key: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    value: {
        type: DataTypes.TEXT, // Can store string, number or JSON string
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Setting;
