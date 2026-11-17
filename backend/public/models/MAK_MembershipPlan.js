import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const MAK_MembershipPlan = sequelize.define("MAK_MembershipPlan", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    features: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    color_class: {
        type: DataTypes.STRING,
        defaultValue: "text-blue-600"
    },
    bg_class: {
        type: DataTypes.STRING,
        defaultValue: "bg-blue-50"
    },
    border_class: {
        type: DataTypes.STRING,
        defaultValue: "border-blue-600"
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: "MAK_membership_plans",
    timestamps: true,
});

export default MAK_MembershipPlan;
