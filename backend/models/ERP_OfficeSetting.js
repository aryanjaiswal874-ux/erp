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
    max_allowed_late: {
        type: DataTypes.INTEGER, // minutes
        defaultValue: 15,
    },
    max_allowed_early: {
        type: DataTypes.INTEGER, // minutes
        defaultValue: 15,
    },
    whatsapp_group_jid: {
        type: DataTypes.STRING,
        defaultValue: "120363426215512132@g.us",
    },
    absent_notification_time: {
        type: DataTypes.TIME,
        defaultValue: "11:00:00",
    },
    absent_notification_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    admin_whatsapp_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "ERP_office_settings",
});

export default ERP_OfficeSetting;
