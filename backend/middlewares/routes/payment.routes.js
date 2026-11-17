import express from "express";
import { createPaymentOrder, verifyPayment, createPaymentLink, verifyPublicPayment } from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Razorpay integration and verification
 */

/**
 * @swagger
 * /api/payments/create-order:
 *   post:
 *     summary: Initiate a Razorpay payment order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, currency]
 *             properties:
 *               amount: { type: number, description: "Amount in smallest currency unit (e.g., paise)" }
 *               currency: { type: string, default: "INR" }
 *     responses:
 *       200:
 *         description: Razorpay order object
 */
router.route("/create-order").post(protect, createPaymentOrder);

/**
 * @swagger
 * /api/payments/verify:
 *   post:
 *     summary: Verify Razorpay payment signature
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [razorpay_order_id, razorpay_payment_id, razorpay_signature]
 *             properties:
 *                razorpay_order_id: { type: string }
 *                razorpay_payment_id: { type: string }
 *                razorpay_signature: { type: string }
 *     responses:
 *       200:
 *         description: Payment verified
 */
router.route("/verify").post(protect, verifyPayment);

/**
 * @swagger
 * /api/payments/create-link:
 *   post:
 *     summary: Create a Razorpay payment link
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount]
 *             properties:
 *               amount: { type: number, description: "Amount in INR" }
 *               description: { type: string }
 *               customer:
 *                 type: object
 *                 properties:
 *                   name: { type: string }
 *                   email: { type: string }
 *                   contact: { type: string }
 *     responses:
 *       200:
 *         description: Razorpay payment link object
 */
router.route("/create-link").post(protect, createPaymentLink);
router.route("/public/create-link").post(createPaymentLink); // Public access
router.route("/public/create-order").post(createPaymentOrder); // Public for Foundation
router.route("/public/verify").post(verifyPublicPayment); // Public for Foundation

export default router;
