import { Document, DocumentType } from "../models/index.js";
import fs from "fs";
import path from "path";

// @desc    Upload document
// @route   POST /api/documents
// @access  Private
export const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { name, type, customerId } = req.body;
        // If customerId is present, it's for a customer (uploaded by Partner)
        // Else it's for the User (uploaded by User)

        const document = await Document.create({
            userId: customerId ? null : req.user.id,
            customerId: customerId || null,
            name,
            type,
            file_url: `/uploads/${req.file.filename}`,
        });

        res.status(201).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get documents (User or Customer's via Partner)
export const getDocuments = async (req, res) => {
    try {
        const { customerId } = req.query;
        const where = customerId ? { customerId } : { userId: req.user.id };

        const documents = await Document.findAll({ where });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private
export const deleteDocument = async (req, res) => {
    try {
        const document = await Document.findByPk(req.params.id);

        if (document) {
            // Check ownership
            if (document.userId === req.user.id || req.user.role === 'admin') {
                const relativePath = document.file_url.startsWith('/') ? document.file_url.substring(1) : document.file_url;

                try {
                    if (fs.existsSync(relativePath)) {
                        fs.unlinkSync(relativePath);
                    }
                } catch (e) { console.error("File delete failed", e); }

                await document.destroy();
                res.json({ message: "Document removed" });
            } else {
                res.status(401).json({ message: "Not authorized" });
            }
        } else {
            res.status(404).json({ message: "Document not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- Document Types (Metadata) ---

// @desc    Get all document types
// @route   GET /api/documents/types
// @access  Public/Private
export const getDocumentTypes = async (req, res) => {
    try {
        const types = await DocumentType.findAll({ order: [['name', 'ASC']] });
        res.json(types);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create document type
// @route   POST /api/documents/types
// @access  Private/Admin
export const createDocumentType = async (req, res) => {
    try {
        console.log("[DocumentType] Creating new type:", req.body.name);
        const body = { ...req.body };

        // Normalize boolean fields
        if (body.isActive === "true") body.isActive = true;
        if (body.isActive === "false") body.isActive = false;
        if (body.isRequired === "true") body.isRequired = true;
        if (body.isRequired === "false") body.isRequired = false;

        const type = await DocumentType.create(body);
        console.log("[DocumentType] Created successfully.");
        res.status(201).json(type);
    } catch (error) {
        console.error("[DocumentType] Create Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update document type
// @route   PUT /api/documents/types/:id
// @access  Private/Admin
export const updateDocumentType = async (req, res) => {
    try {
        const type = await DocumentType.findByPk(req.params.id);
        if (type) {
            console.log("[DocumentType] Updating type:", type.name);
            const body = { ...req.body };

            // Normalize boolean fields
            if (body.isActive === "true") body.isActive = true;
            if (body.isActive === "false") body.isActive = false;
            if (body.isRequired === "true") body.isRequired = true;
            if (body.isRequired === "false") body.isRequired = false;

            await type.update(body);
            console.log("[DocumentType] Updated successfully.");
            res.json(type);
        } else {
            res.status(404).json({ message: "Document Type not found" });
        }
    } catch (error) {
        console.error("[DocumentType] Update Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete document type
// @route   DELETE /api/documents/types/:id
// @access  Private/Admin
export const deleteDocumentType = async (req, res) => {
    try {
        const type = await DocumentType.findByPk(req.params.id);
        if (type) {
            await type.destroy();
            res.json({ message: "Document Type removed" });
        } else {
            res.status(404).json({ message: "Document Type not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
