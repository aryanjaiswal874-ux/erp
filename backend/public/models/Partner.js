import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Partner = sequelize.define("Partner", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
        defaultValue: "Pending",
    },
    payment_status: {
        type: DataTypes.ENUM("Pending", "Paid"),
        defaultValue: "Pending",
    },
    company_profile: {
        type: DataTypes.JSON, // { company_name, cin, tan, gst, address, etc }
        allowNull: true,
    },
    authorization_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    commission_percentage: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        comment: "Global percentage discount for this partner on all products"
    },
    plan_type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Member"
    }
});

export default Partner;
