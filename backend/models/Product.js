import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING, // URL
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
    offer_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    partner_discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: "Percentage discount for partners"
    },
    serviceGroupId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    productTypeId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    eligibility: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    documents_required: {
        type: DataTypes.JSON, // List of required doc names
        allowNull: true,
    },
    education_content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    youtube_links: {
        type: DataTypes.JSON, // Array of URLs
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
}, {
    sequelize,
    modelName: 'Product',
    indexes: [
        { fields: ['is_active'] },
        { fields: ['serviceGroupId'] },
        { fields: ['productTypeId'] }
    ]
});

export default Product;
