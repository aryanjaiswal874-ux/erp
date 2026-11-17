import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const MAKDocument = sequelize.define("MAKDocument", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    memberId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    documentName: {
        type: DataTypes.STRING, // Aadhar, PAN, Other etc
        allowNull: false,
    },
    documentPath: {
        type: DataTypes.STRING, // URL to file
        allowNull: false,
    },
    fileType: {
        type: DataTypes.STRING, // pdf, jpg, png
        allowNull: true,
    },
}, {
    timestamps: true,
});

export default MAKDocument;
