import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Payment = sequelize.define("Payment", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    razorpay_payment_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    razorpay_order_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    razorpay_signature: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("Success", "Failed", "Pending"),
        defaultValue: "Pending",
    },
    method: {
        type: DataTypes.STRING, // e.g. "card", "upi"
        allowNull: true,
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

export default Payment;
