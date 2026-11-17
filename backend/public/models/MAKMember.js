import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const MAKMember = sequelize.define("MAKMember", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    // Personal details
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    religion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    photo: {
        type: DataTypes.STRING, // URL to uploaded photo
        allowNull: true,
    },
    membershipType: {
        type: DataTypes.STRING, // Member, Area Member, etc.
        allowNull: true,
    },
    // Communication
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmailOrEmpty(value) {
                if (value && value.trim() !== '' && !/^\S+@\S+\.\S+$/.test(value)) {
                    throw new Error('Invalid email format');
                }
            }
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    whatsapp: {
        type: DataTypes.STRING, // Stored with prefix 91
        allowNull: true,
    },
    // Payment
    paymentAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    paymentReceipt: {
        type: DataTypes.STRING, // URL to receipt photo/pdf
        allowNull: true,
    },
    // Auth
    role: {
        type: DataTypes.ENUM("admin", "member"),
        defaultValue: "member",
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true, // For members, default will be DOB or set later
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    // Metadata
    idCardUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    certificateUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    otpExpires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
});

export default MAKMember;
