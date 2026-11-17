import { Company } from "../models/index.js";

// @desc    Get user companies
// @route   GET /api/auth/companies
// @access  Private
export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll({ where: { userId: req.user.id } });
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Add new company
// @route   POST /api/auth/companies
// @access  Private
export const createCompany = async (req, res) => {
    try {
        const { company_name, cin, tan, gstin, pan, address, contact_person, contact_mobile, contact_email } = req.body;

        const company = await Company.create({
            userId: req.user.id,
            company_name, cin, tan, gstin, pan, address,
            contact_person, contact_mobile, contact_email
        });

        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update company
// @route   PUT /api/auth/companies/:id
// @access  Private
export const updateCompany = async (req, res) => {
    try {
        const company = await Company.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (company) {
            await company.update(req.body);
            res.json(company);
        } else {
            res.status(404).json({ message: "Company not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Delete company
// @route   DELETE /api/auth/companies/:id
// @access  Private
export const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (company) {
            await company.destroy();
            res.json({ message: "Company removed" });
        } else {
            res.status(404).json({ message: "Company not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Set default company
// @route   PUT /api/auth/companies/:id/default
// @access  Private
export const setDefaultCompany = async (req, res) => {
    try {
        // Reset all others
        await Company.update({ is_default: false }, { where: { userId: req.user.id } });

        // Set new default
        const company = await Company.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (company) {
            company.is_default = true;
            await company.save();
            res.json(company);
        } else {
            res.status(404).json({ message: "Company not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
