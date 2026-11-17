import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ERP_LiveLocation = sequelize.define("ERP_LiveLocation", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employee_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: false,
    },
    gps_status: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'on',
    },
    last_update: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "employee_live_location",
    timestamps: false,
});

export default ERP_LiveLocation;
