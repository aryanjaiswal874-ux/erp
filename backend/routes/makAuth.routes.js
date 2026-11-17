import express from "express";
import { loginMAK, sendOTP, changePassword } from "../controllers/makAuthController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/mak/auth/login:
 *   post:
 *     summary: MAK User/Admin Login
 *     tags: [MAK Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, password]
 *             properties:
 *               id: { type: string, description: "Mobile number or 'admin'" }
 *               password: { type: string }
 *     responses:
 *       200: { description: "Login successful" }
 *       401: { description: "Invalid credentials" }
 */
router.post("/login", loginMAK);

/**
 * @swagger
 * /api/mak/auth/send-otp:
 *   post:
 *     summary: Send OTP to WhatsApp
 *     tags: [MAK Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [phone]
 *             properties:
 *               phone: { type: string }
 *     responses:
 *       200: { description: "OTP sent" }
 */
router.post("/send-otp", sendOTP);

/**
 * @swagger
 * /api/mak/auth/change-password:
 *   post:
 *     summary: Change password
 *     tags: [MAK Auth]
 *     security: [{ bearerAuth: [] }]
 */
router.post("/change-password", protect, changePassword);

export default router;
