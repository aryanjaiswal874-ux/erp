import { MessageTemplate, User } from "../models/index.js";

// Create template
export const createTemplate = async (req, res) => {
    try {
        const { title, message, type, mediaUrl, caption, fileName, mimetype } = req.body;
        const createdBy = req.user.id;

        const template = await MessageTemplate.create({
            title,
            message,
            type,
            mediaUrl,
            caption,
            fileName,
            mimetype,
            createdBy
        });
        res.status(201).json(template);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all templates
export const getTemplates = async (req, res) => {
    try {
        const templates = await MessageTemplate.findAll({
            include: [{ model: User, attributes: ['full_name'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete template
export const deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        await MessageTemplate.destroy({ where: { id } });
        res.json({ message: "Template deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Template
export const updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const template = await MessageTemplate.findByPk(id);
        if (!template) return res.status(404).json({ message: "Template not found" });

        await template.update(req.body);
        res.json(template);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
