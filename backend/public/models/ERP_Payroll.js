import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ERP_Payroll = sequelize.define("ERP_Payroll", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employee_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    month: {
        type: DataTypes.STRING(20), // 'April 2026'
        allowNull: false,
    },
    gross_salary: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    total_present: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    total_absent: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    total_working_days: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    earned_salary: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    deductions: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    net_payable: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM("generated", "paid"),
        defaultValue: "generated",
    },
}, {
    tableName: "ERP_payrolls",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['employee_id', 'month']
        }
    ]
});

export default ERP_Payroll;
