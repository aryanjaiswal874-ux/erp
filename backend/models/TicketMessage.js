import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const TicketMessage = sequelize.define("TicketMessage", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    ticketId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false, // User ID or Admin ID (if admin, maybe specific ID or check role)
    },
    senderRole: {
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

export default TicketMessage;
