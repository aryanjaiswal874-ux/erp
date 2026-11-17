import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Document = sequelize.define("Document", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: true, // Can belong to user
    },
    customerId: {
        type: DataTypes.UUID,
        allowNull: true, // OR belong to a partner's customer
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING, // e.g. "Aadhaar", "PAN"
        allowNull: true,
    },
});

export default Document;
