import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const WhatsAppMessage = sequelize.define("WhatsAppMessage", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    jid: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    fromMe: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    pushName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    mediaUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // 0=sent, 1=delivered, 2=read
    }
}, {
    tableName: "whatsapp_messages",
    timestamps: false
});

export default WhatsAppMessage;
