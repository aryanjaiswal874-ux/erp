import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PartnerCertificate = sequelize.define("PartnerCertificate", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  partnerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  certificateId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  issueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  authorizedCompanyName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "SBGM Digital India Pvt. Ltd.",
  },
  signatoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Authorized Signatory",
  },
  pdfPath: {
    // relative path under /uploads, e.g. "certificates/partner-cert-xxxx.pdf"
    type: DataTypes.STRING,
    allowNull: false,
  },
  templateVersion: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "v2-landscape-vintage",
  },
  revokedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  revokeReason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default PartnerCertificate;

