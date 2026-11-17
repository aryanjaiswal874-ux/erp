import express from "express";
import {
    uploadDocument,
    getDocuments,
    deleteDocument,
    getDocumentTypes,
    createDocumentType,
    updateDocumentType,
    deleteDocumentType
} from "../controllers/documentController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Citizen document vault management
 */

// --- Document Types (Metadata) ---

/**
 * @swagger
 * /api/documents/types:
 *   get:
 *     summary: Get all defined document types
 *     tags: [Documents]
 *   post:
 *     summary: Create document type (Admin)
 *     tags: [Documents]
 */
router.route("/types")
    .get(getDocumentTypes)
    .post(protect, adminOnly, createDocumentType);

router.route("/types/:id")
    .put(protect, adminOnly, updateDocumentType)
    .delete(protect, adminOnly, deleteDocumentType);

// --- User Documents ---

/**
 * @swagger
 * /api/documents:
 *   post:
 *     summary: Upload a document to the vault
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file, name]
 *             properties:
 *               file: { type: string, format: binary }
 *               name: { type: string }
 *     responses:
 *       201:
 *         description: Document uploaded
 *   get:
 *     summary: Retrieve user's document vault
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of documents
 */
router.route("/")
    .post(protect, upload.single('file'), uploadDocument)
    .get(protect, getDocuments);

/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     summary: Remove a document from the vault
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Document deleted
 */
router.route("/:id").delete(protect, deleteDocument);

export default router;
