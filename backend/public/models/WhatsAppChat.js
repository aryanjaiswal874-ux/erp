import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const WhatsAppChat = sequelize.define("WhatsAppChat", {
    jid: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    timestamp: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    unreadCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    tableName: "whatsapp_chats",
    timestamps: false
});

export default WhatsAppChat;
