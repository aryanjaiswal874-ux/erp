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
    from_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    to_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    total_days: {
        type: DataTypes.INTEGER,
        defaultValue: 1
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
