import express from "express";
import { protect, superAdminOnly } from "../middlewares/authMiddleware.js";
import {
    getActiveEmployees,
    saveOfferLetter,
    sendOfferLetterEmail,
    getOfferLetterHistory,
    deleteOfferLetter,
} from "../controllers/offerLetterController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OfferLetter
 *   description: Offer Letter Management (Super Admin Only)
 */

/**
 * @swagger
 * /api/offer-letters/employees:
 *   get:
 *     summary: Get active employees for offer letter generation
 *     tags: [OfferLetter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active employees
 */
router.get("/employees", protect, superAdminOnly, getActiveEmployees);

/**
 * @swagger
 * /api/offer-letters/save:
 *   post:
 *     summary: Save offer letter record
 *     tags: [OfferLetter]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id: { type: string }
 *               employee_name: { type: string }
 *               employee_email: { type: string }
 *               designation: { type: string }
 *               joining_date: { type: string, format: date }
 *               annual_salary: { type: number }
 *     responses:
 *       201:
 *         description: Offer letter saved
 */
router.post("/save", protect, superAdminOnly, saveOfferLetter);

/**
 * @swagger
 * /api/offer-letters/send:
 *   post:
 *     summary: Send offer letter via email
 *     tags: [OfferLetter]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to: { type: string }
 *               subject: { type: string }
 *               htmlContent: { type: string }
 *               employee_name: { type: string }
 *               designation: { type: string }
 *               joining_date: { type: string }
 *               annual_salary: { type: number }
 *               employee_id: { type: string }
 *     responses:
 *       200:
 *         description: Email sent successfully
 */
router.post("/send", protect, superAdminOnly, sendOfferLetterEmail);

/**
 * @swagger
 * /api/offer-letters/history:
 *   get:
 *     summary: Get offer letter history
 *     tags: [OfferLetter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of generated offer letters
 */
router.get("/history", protect, superAdminOnly, getOfferLetterHistory);

/**
 * @swagger
 * /api/offer-letters/{id}:
 *   delete:
 *     summary: Delete offer letter record
 *     tags: [OfferLetter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record deleted successfully
 */
router.delete("/:id", protect, superAdminOnly, deleteOfferLetter);

export default router;
