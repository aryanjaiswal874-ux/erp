import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const DocumentType = sequelize.define("DocumentType", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'General', // Fallback for existing
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isRequired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "Whether this document is mandatory for all users"
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default DocumentType;
