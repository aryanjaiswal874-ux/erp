import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Location = sequelize.define("Location", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    district: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postOffice: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pincode: {
        type: DataTypes.STRING(6),
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Location',
    indexes: [
        { fields: ['pincode'] },
        { fields: ['state'] },
        { fields: ['district'] }
    ]
});

export default Location;
