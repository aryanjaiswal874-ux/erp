import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ERP_LocationHistory = sequelize.define("ERP_LocationHistory", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    employee_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
    recorded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "employee_location_history",
    timestamps: false,
    indexes: [
        {
            name: 'idx_emp_time',
            fields: ['employee_id', 'recorded_at']
        },
        {
            name: 'idx_recorded_at',
            fields: ['recorded_at']
        }
    ]
});

export default ERP_LocationHistory;
