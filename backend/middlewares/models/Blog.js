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
        type: DataTypes.STRING, // URL for image or YouTube link/ID
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
