import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ERP_EmployeeLocation = sequelize.define("ERP_EmployeeLocation", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employee_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "ERP_employee_tracking",
    timestamps: false,
});

export default ERP_EmployeeLocation;
