import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ERP_ToDo = sequelize.define("ERP_ToDo", {
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
    task: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "completed"),
        defaultValue: "pending",
    },
}, {
    tableName: "ERP_todo_list",
    timestamps: true,
});

export default ERP_ToDo;
