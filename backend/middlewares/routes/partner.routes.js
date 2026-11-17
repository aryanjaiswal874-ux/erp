import express from "express";
import {
    applyForPartnership,
    getPartners,
    updatePartnerStatus,
    addCustomer,
    getMyCustomers,
    getPartnerStats,
    receivePayment
} from "../controllers/partnerController.js";
import { downloadMyPartnerCertificatePdf } from "../controllers/certificateController.js";
import { protect, adminOnly, partnerOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Partners
 *   description: Authorized Channel Partner operations
 */

/**
 * @swagger
 * /api/partners/apply:
 *   post:
 *     summary: Apply for channel partnership
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               business_name: { type: string }
 *               pan_number: { type: string }
 *     responses:
 *       201:
 *         description: Application submitted
 */
router.route("/apply").post(protect, applyForPartnership);

/**
 * @swagger
 * /api/partners:
 *   get:
 *     summary: List all partner applications (Admin)
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of partners
 */
router.route("/").get(protect, adminOnly, getPartners);

/**
 * @swagger
 * /api/partners/{id}/status:
 *   put:
 *     summary: Approve or Reject partner application (Admin)
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string, enum: [Approved, Rejected] }
 *     responses:
 *       200:
 *         description: Status updated
 */
router.route("/:id/status").put(protect, adminOnly, updatePartnerStatus);

/**
 * @swagger
 * /api/partners/stats:
 *   get:
 *     summary: Get partner business metrics
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Partnership statistics
 */
router.route("/stats").get(protect, partnerOnly, getPartnerStats);

/**
 * @swagger
 * /api/partners/certificate:
 *   get:
 *     summary: Download official partnership certificate (PDF)
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF file
 */
router.route("/certificate").get(protect, partnerOnly, downloadMyPartnerCertificatePdf);

/**
 * @swagger
 * /api/partners/customers:
 *   post:
 *     summary: Register a new customer under partner
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [full_name, mobile]
 *             properties:
 *               full_name: { type: string }
 *               mobile: { type: string }
 *               email: { type: string }
 *     responses:
 *       201:
 *         description: Customer registered
 *   get:
 *     summary: List customers registered by partner
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 */
router.route("/customers").post(protect, partnerOnly, addCustomer).get(protect, partnerOnly, getMyCustomers);
router.route("/payments").post(protect, partnerOnly, receivePayment);

export default router;
