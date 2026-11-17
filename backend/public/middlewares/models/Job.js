import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Job = sequelize.define("Job", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM("Full-time", "Part-time", "Internship"),
        defaultValue: "Full-time",
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    meta_title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    meta_description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

export default Job;
