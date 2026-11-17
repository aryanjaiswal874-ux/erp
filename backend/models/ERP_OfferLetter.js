import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ERP_OfferLetter = sequelize.define("ERP_OfferLetter", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employee_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    employee_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    employee_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    annual_salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    responsibilities: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    generated_by: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("generated", "sent", "accepted"),
        defaultValue: "generated",
    },
    sent_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: "ERP_offer_letters",
    timestamps: true,
});

export default ERP_OfferLetter;
