import { Partner, Customer, User, Order, PartnerCertificate } from "../models/index.js";
import { generatePDFBuffer } from "../utils/exportUtils.js";
import fs from "fs/promises";
import path from "path";
import { generatePartnerCertificatePdf, newCertificateId } from "../utils/certificates/generatePartnerCertificatePdf.js";
import { ensureActiveCertificate } from "./certificateController.js";

// @desc    Get Partner Profile & Stats
export const getPartnerStats = async (req, res) => {
    try {
        const partner = await Partner.findOne({ where: { userId: req.user.id } });
        if (!partner) return res.status(404).json({ message: "Partner record not found" });

        const customerCount = await Customer.count({ where: { partnerId: partner.id } });
        // Profit logic placeholder: sum of (customer_charged - cost_paid)
        const customers = await Customer.findAll({ where: { partnerId: partner.id } });

        let totalProfit = 0;
        customers.forEach(c => {
            if (c.payment_details) {
                totalProfit += (parseFloat(c.payment_details.amount_charged || 0) - parseFloat(c.payment_details.amount_paid_to_sbgm || 0));
            }
        });

        res.json({
            partner,
            stats: {
                totalCustomers: customerCount,
                totalProfit: totalProfit.toFixed(2)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add Customer (By Partner)
export const addCustomer = async (req, res) => {
    try {
        const partner = await Partner.findOne({ where: { userId: req.user.id } });
        const customer = await Customer.create({
            ...req.body,
            partnerId: partner.id
        });
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Apply for partnership
export const applyForPartnership = async (req, res) => {
    try {
        const { plan_type } = req.body;
        const partner = await Partner.create({
            userId: req.user.id,
            status: "Pending",
            payment_status: "Pending",
            plan_type: plan_type || "Partner"
        });
        res.status(201).json(partner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all partners (Admin)
export const getPartners = async (req, res) => {
    try {
        const partners = await Partner.findAll({ include: User });
        res.json(partners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update partner status (Admin)
export const updatePartnerStatus = async (req, res) => {
    try {
        const partner = await Partner.findByPk(req.params.id);
        if (partner) {
            partner.status = req.body.status;
            if (req.body.status === "Approved") {
                partner.authorization_date = new Date();
                const user = await User.findByPk(partner.userId);
                user.role = "partner";
                await user.save();

                // Generate/Ensure certificate after approval
                await ensureActiveCertificate({ partner, user, req });
            }
            await partner.save();
            res.json(partner);
        } else {
            res.status(404).json({ message: "Partner not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get my customers
export const getMyCustomers = async (req, res) => {
    try {
        const partner = await Partner.findOne({ where: { userId: req.user.id } });
        const customers = await Customer.findAll({ where: { partnerId: partner.id } });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Receive Payment from Customer
export const receivePayment = async (req, res) => {
    try {
        const { customerId, amount_charged, amount_paid_to_sbgm, mode } = req.body;
        const customer = await Customer.findByPk(customerId);

        if (!customer) return res.status(404).json({ message: "Customer not found" });

        customer.payment_details = {
            amount_charged: parseFloat(amount_charged),
            amount_paid_to_sbgm: parseFloat(amount_paid_to_sbgm),
            mode,
            date: new Date()
        };

        await customer.save();
        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
