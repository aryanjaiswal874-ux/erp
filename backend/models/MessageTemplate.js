import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const MessageTemplate = sequelize.define("MessageTemplate", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM("text", "image", "video", "document"),
        defaultValue: "text"
    },
    mediaUrl: {
        type: DataTypes.STRING,
        allowNull: true // For image/video/doc URL
    },
    caption: {
        type: DataTypes.TEXT,
        allowNull: true // For media caption
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: true // For document filename
    },
    mimetype: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false
    }
});

export default MessageTemplate;
