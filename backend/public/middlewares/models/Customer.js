import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Customer = sequelize.define("Customer", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    partnerId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    payment_details: {
        type: DataTypes.JSON, // { amount, mode }
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "New",
    },
    assigned_to_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export default Customer;
