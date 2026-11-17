import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Application = sequelize.define("Application", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    jobId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: true, // Optional for non-logged in users
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resume_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cover_note: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("New", "Reviewed", "Shortlisted", "Rejected"),
        defaultValue: "New",
    },
});

export default Application;
