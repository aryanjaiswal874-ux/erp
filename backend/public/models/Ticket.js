import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Ticket = sequelize.define("Ticket", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        defaultValue: "General",
    },
    priority: {
        type: DataTypes.ENUM("Low", "Medium", "High"),
        defaultValue: "Medium",
    },
    status: {
        type: DataTypes.ENUM("Open", "In Progress", "Resolved", "Closed"),
        defaultValue: "Open",
    },
    // We will use TicketMessage model for actual conversation. 
    // This field can be kept as a short description or removed. 
    // Making it nullable to prevent errors if controller doesn't fill it.
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    admin_remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

export default Ticket;
