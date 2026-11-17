import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ERP_OfficeSetting = sequelize.define("ERP_OfficeSetting", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    office_in_time: {
        type: DataTypes.TIME,
        defaultValue: "09:00:00",
    },
    office_out_time: {
        type: DataTypes.TIME,
        defaultValue: "18:00:00",
    },
    holidays: {
        type: DataTypes.JSON, // [{ date: '2026-04-01', name: 'Holiday Name' }]
        defaultValue: [],
    },
    week_offs: {
        type: DataTypes.JSON, // ['Sunday']
        defaultValue: ["Sunday"],
    },
}, {
    tableName: "ERP_office_settings",
});

export default ERP_OfficeSetting;
