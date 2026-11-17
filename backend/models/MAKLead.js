import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const MAKLead = sequelize.define("MAKLead", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    serialNo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("Interested", "Not Interested", "May be Interested", "New", "Converted as Customer"),
        defaultValue: "New",
    },
    whatsapp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    additionalInfo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // Foreign keys will be handled by associations
    addedBy: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    assignedTo: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    source: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Meta Ad"
    },
    interested_for: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

export default MAKLead;
