import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Blog = sequelize.define("Blog", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM("image", "video"),
        defaultValue: "image",
        allowNull: false,
    },
    mediaUrl: {
        type: DataTypes.TEXT, // Changed from STRING to TEXT to support multiple/long URLs
        allowNull: false,
    },
    images: {
        type: DataTypes.TEXT, // For multiple images (comma separated or JSON)
        allowNull: true,
    },
    category: {
        type: DataTypes.ENUM("SBGM", "CSP", "MAK"),
        defaultValue: "SBGM",
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        defaultValue: "Admin",
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    timestamps: true,
});

export default Blog;
