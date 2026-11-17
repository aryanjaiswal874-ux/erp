import express from "express";
import { getAdminStats, getUsers, updateUser, deleteUser, sendWhatsAppMessage } from "../controllers/adminController.js";
import { protect, adminOnly, superAdminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrative statistics and operations
 */

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats retrieved
 *       401:
 *         description: Unauthorized
 */
router.get("/stats", protect, adminOnly, getAdminStats);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved
 *       401:
 *         description: Unauthorized
 */
router.get("/users", protect, adminOnly, getUsers);
router.put("/users/:id", protect, adminOnly, upload.single('file'), updateUser);
router.delete("/users/:id", protect, superAdminOnly, deleteUser);
router.post("/send-whatsapp", protect, adminOnly, sendWhatsAppMessage);

export default router;
