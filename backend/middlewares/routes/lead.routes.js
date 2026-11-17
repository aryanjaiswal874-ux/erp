import express from "express";
import {
    createLead,
    bulkCreateLeads,
    getAllLeads,
    getLeadById,
    updateLead,
    addFollowUp,
    getDailyReport,
    sendDailyReportEmail
} from "../controllers/lead.controller.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js"; // Assuming auth middleware
import upload from "../middlewares/uploadMiddleware.js"; // Assuming upload middleware

const router = express.Router();

router.use(protect); // All lead routes require login

router.post("/bulk", bulkCreateLeads);

/**
 * @swagger
 * tags:
 *   name: Leads
 *   description: Lead management and tracking
 */

/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Get all leads with filters
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or contact
 *       - in: query
 *         name: assignedTo
 *         schema:
 *           type: string
 *         description: Filter by assigned user ID
 *       - in: query
 *         name: myLeads
 *         schema:
 *           type: boolean
 *         description: Show only leads assigned to current user
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of leads
 *   post:
 *     summary: Create a new lead
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, contact]
 *             properties:
 *               name:
 *                 type: string
 *               contact:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               whatsapp:
 *                 type: string
 *               occupation:
 *                 type: string
 *               additionalInfo:
 *                 type: string
 *               assignedTo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lead created
 */
router.post("/", createLead);
router.get("/", getAllLeads);

/**
 * @swagger
 * /api/leads/reports:
 *   get:
 *     summary: Get daily followup report
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date for report (defaults to today)
 *     responses:
 *       200:
 *         description: Grouped report by user
 */
router.get("/reports", getDailyReport);
router.post("/send-report", sendDailyReportEmail);

/**
 * @swagger
 * /api/leads/{id}:
 *   get:
 *     summary: Get lead by ID with history
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead details
 *   put:
 *     summary: Update lead
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Lead updated
 */
router.get("/:id", getLeadById);
router.put("/:id", updateLead);

/**
 * @swagger
 * /api/leads/{leadId}/followup:
 *   post:
 *     summary: Add followup remark with attachments
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: leadId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               remark:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [Call, Meeting, Note, Whatsapp, Email]
 *               status:
 *                 type: string
 *                 description: New status for lead
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               audio:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Followup added
 */
router.post("/:leadId/followup", upload.fields([{ name: 'attachments', maxCount: 5 }, { name: 'audio', maxCount: 1 }]), addFollowUp);

export default router;
