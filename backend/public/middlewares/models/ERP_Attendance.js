import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ERP_Attendance = sequelize.define("ERP_Attendance", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employee_id: {
        type: DataTypes.UUID, // User model uses UUID
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    in_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    out_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    total_work_hours: {
        type: DataTypes.STRING(100),
        defaultValue: "00:00:00",
    },
    current_work_status: {
        type: DataTypes.ENUM("start", "stop"),
        defaultValue: "stop",
    },
    status: {
        type: DataTypes.ENUM("present", "absent", "half_day", "leave", "week_off", "holiday"),
        defaultValue: "present",
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Additional: {
        type: DataTypes.TEXT,
        defaultValue: '{ "Request": "", "Approval": "", "Remarks": "" }',
    },
    location: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    photo: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
}, {
    tableName: "ERP_employee_attendance",
    timestamps: true,
    createdAt: "created_on",
    updatedAt: "updated_on",
});

export default ERP_Attendance;
