import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    customerId: {
        type: DataTypes.UUID,
        allowNull: true, // For partners placing orders for their customers
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Pending", "In Progress", "Completed", "Cancelled"),
        defaultValue: "Pending",
    },
    payment_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    invoice_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    timeline: {
        type: DataTypes.JSON, // [{ status, date, remarks }]
        defaultValue: [],
    },
}, {
    sequelize,
    modelName: 'Order',
    indexes: [
        { fields: ['userId'] },
        { fields: ['productId'] },
        { fields: ['status'] }
    ]
});

export default Order;
