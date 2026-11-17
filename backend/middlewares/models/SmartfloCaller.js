import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const SmartfloCaller = sequelize.define("SmartfloCaller", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    caller_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default SmartfloCaller;
