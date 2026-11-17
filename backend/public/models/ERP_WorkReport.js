import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ERP_WorkReport = sequelize.define("ERP_WorkReport", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employee_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    report_content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: "ERP_work_reports",
    timestamps: true,
});

export default ERP_WorkReport;
