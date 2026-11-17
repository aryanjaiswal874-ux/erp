import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ServiceGroup = sequelize.define("ServiceGroup", {
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
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    sortOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
});

export default ServiceGroup;
