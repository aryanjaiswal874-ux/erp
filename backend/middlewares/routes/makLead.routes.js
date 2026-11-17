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
} from "../controllers/makLead.controller.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/bulk", bulkCreateLeads);

/**
 * @swagger
 * tags:
 *   name: MAK Leads
 *   description: MAK Lead management and tracking
 */

router.post("/", createLead);
router.get("/", getAllLeads);

router.get("/reports", getDailyReport);
router.post("/send-report", sendDailyReportEmail);

router.get("/:id", getLeadById);
router.put("/:id", updateLead);

router.post("/:leadId/followup", upload.fields([{ name: 'attachments', maxCount: 5 }, { name: 'audio', maxCount: 1 }]), addFollowUp);

export default router;
