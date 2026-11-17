import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ERP_Holiday = sequelize.define("ERP_Holiday", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: "ERP_holidays",
    timestamps: true,
});

export default ERP_Holiday;
