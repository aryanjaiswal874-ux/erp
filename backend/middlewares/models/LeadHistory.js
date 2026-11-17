import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const LeadHistory = sequelize.define("LeadHistory", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    remark: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM("Call", "Meeting", "Note", "Whatsapp", "Email", "Walkin", "Google Meeting"),
        defaultValue: "Note",
    },
    attachments: {
        type: DataTypes.JSON, // Array of file paths
        allowNull: true,
    },
    audioRecording: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Foreign keys
    leadId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    actionBy: {
        type: DataTypes.UUID,
        allowNull: false,
    }
});

export default LeadHistory;
