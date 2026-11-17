import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Company = sequelize.define("Company", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tan: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gstin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pan: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.JSON, // { line1, city, state, pincode }
        allowNull: true,
    },
    contact_person: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contact_mobile: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contact_email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

export default Company;
