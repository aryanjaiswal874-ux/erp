import { User, Partner, Order, Product, Application, PartnerCertificate } from "../models/index.js";
import { generatePDFBuffer, generateExcelBuffer } from "../utils/exportUtils.js";
import fs from "fs/promises";
import path from "path";
import { generatePartnerCertificatePdf, newCertificateId } from "../utils/certificates/generatePartnerCertificatePdf.js";

const COMPANY_NAME = "SBGM Digital India Pvt. Ltd.";
const TEMPLATE_VERSION = "v2-landscape-vintage";

async function ensureCertificatesDir() {
    const uploadsRoot = path.join(path.resolve(), "uploads");
    const certDir = path.join(uploadsRoot, "certificates");
    await fs.mkdir(certDir, { recursive: true });
    return { uploadsRoot, certDir };
}

function getPublicVerifyUrl(req, certificateId) {
    const base =
        process.env.FRONTEND_BASE_URL ||
        `${req.protocol}://${req.get("host")}`;
    return `${base.replace(/\/$/, "")}/verify-partner/${certificateId}`;
}

// @desc    Get all users (Admin)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
            include: [Partner]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Approve/Reject Partner
export const updatePartnerStatus = async (req, res) => {
    try {
        const partner = await Partner.findByPk(req.params.id);
        if (partner) {
            partner.status = req.body.status;
            if (req.body.status === "Approved") {
                partner.authorization_date = new Date();
                // Update user role to partner
                const user = await User.findByPk(partner.userId);
                if (user) {
                    user.role = "partner";
                    await user.save();
                } else {
                    throw new Error("Associated user not found for this partner.");
                }

                // Generate certificate ONLY after approval (idempotent)
                try {
                    const existing = await PartnerCertificate.findOne({
                        where: { partnerId: partner.id, revokedAt: null },
                        order: [["createdAt", "DESC"]],
                    });
                    if (!existing) {
                        const certificateId = newCertificateId();
                        const verificationUrl = getPublicVerifyUrl(req, certificateId);
                        const signatoryName = process.env.CERT_SIGNATORY_NAME || "Authorized Signatory";
                        const { certDir } = await ensureCertificatesDir();
                        const filename = `partner-cert-${certificateId}.pdf`;
                        const relativePdfPath = path.posix.join("certificates", filename);
                        const pdfAbsPath = path.join(certDir, filename);

                        const { pdfBuffer, issueDate } = await generatePartnerCertificatePdf({
                            partner,
                            user,
                            certificateId,
                            signatoryName,
                            signatoryRole: "Managing Director", // Default role
                            verificationUrl,
                            companyName: COMPANY_NAME,
                            footerAddress: process.env.COMPANY_ADDRESS || "Registered Office: India",
                            footerWebsite: process.env.COMPANY_WEBSITE || "www.sbgmdigitalindia.com",
                        });
                        await fs.writeFile(pdfAbsPath, pdfBuffer);

                        await PartnerCertificate.create({
                            partnerId: partner.id,
                            userId: user.id,
                            certificateId,
                            issueDate,
                            authorizedCompanyName: COMPANY_NAME,
                            signatoryName,
                            signatoryRole: "Managing Director",
                            pdfPath: relativePdfPath,
                            templateVersion: TEMPLATE_VERSION,
                        });
                    }
                } catch (certError) {
                    console.error("Certificate Generation Warning:", certError.message);
                    // We don't throw here, so the partner remains approved even if PDF fails
                }
            }
            await partner.save();
            res.json(partner);
        } else {
            res.status(404).json({ message: "Partner not found" });
        }
    } catch (error) {
        console.error("Partner Status Update Error:", error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get Stats
export const getDashboardStats = async (req, res) => {
    try {
        const userCount = await User.count();
        const orderCount = await Order.count();
        const productCount = await Product.count();
        const partnerCount = await Partner.count({ where: { status: "Approved" } });

        const recentOrders = await Order.findAll({
            limit: 5,
            order: [["createdAt", "DESC"]],
            include: [User, Product]
        });

        res.json({
            users: userCount,
            orders: orderCount,
            products: productCount,
            partners: partnerCount,
            recentOrders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Export Users to Excel
export const exportUsersExcel = async (req, res) => {
    try {
        const users = await User.findAll();
        const columns = [
            { header: "ID", key: "id", width: 36 },
            { header: "Name", key: "full_name", width: 25 },
            { header: "Email", key: "email", width: 30 },
            { header: "Mobile", key: "mobile", width: 15 },
            { header: "Role", key: "role", width: 10 },
            { header: "Created At", key: "createdAt", width: 20 },
        ];
        const data = users.map(u => u.toJSON());
        const buffer = await generateExcelBuffer("Users", columns, data);

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Order Status
export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            order.status = req.body.status;
            const updatedTimeline = [...(order.timeline || []), {
                status: req.body.status,
                date: new Date(),
                remarks: req.body.remarks || `Order status updated to ${req.body.status}`
            }];
            order.timeline = updatedTimeline;
            await order.save();
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// @desc    Get Customers for a specific Partner
export const getPartnerCustomers = async (req, res) => {
    try {
        const { id } = req.params; // Partner ID
        const { Customer, Order, Document } = await import("../models/index.js");

        const customers = await Customer.findAll({
            where: { partnerId: id },
            include: [
                { model: Order },
                { model: Document }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePartnerCommission = async (req, res) => {
    try {
        const { id } = req.params;
        const { commission_percentage } = req.body;

        const partner = await Partner.findByPk(id);
        if (!partner) return res.status(404).json({ message: "Partner not found" });

        partner.commission_percentage = commission_percentage;
        await partner.save();

        res.json({ message: "Commission percentage updated successfully", partner });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// @desc    Get all orders (Admin)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [User, Product],
            order: [["createdAt", "DESC"]]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
import bcrypt from "bcryptjs";

// @desc    Update User (Admin)
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const editableFields = ['full_name', 'mobile', 'email', 'address', 'state', 'city', 'pincode', 'role', 'designation', 'qualification', 'age', 'gender', 'secondary_mobiles', 'secondary_emails', 'bank_details', 'is_partner_application_sent', 'is_active', 'smartflo_agent_id', 'call_access', 'smartflo_caller_id'];

        editableFields.forEach(field => {
            if (req.body[field] !== undefined) user[field] = req.body[field];
        });

        if (req.body.password && req.body.password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        if (req.file) {
            user.profile_photo = `/uploads/${req.file.filename}`;
        }

        await user.save();
        res.json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete User (Admin)
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Associated records will be handled by DB or manually
        await Partner.destroy({ where: { userId: id } });
        await user.destroy();

        res.json({ message: "User and associated partner data deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Upload Media
export const uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        res.json({
            message: "File uploaded successfully",
            url: `/uploads/${req.file.filename}`,
            filename: req.file.filename,
            mimetype: req.file.mimetype
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
