import express from "express";
import {
    getAllUsers,
    updatePartnerStatus,
    updateOrderStatus,
    getDashboardStats,
    exportUsersExcel,
    updatePartnerCommission,
    getPartnerCustomers,

    getAllOrders,
    updateUser,
    deleteUser,
    uploadMedia
} from "../controllers/adminController.js";
import upload from "../middlewares/uploadMiddleware.js";
import { getPartnerPlanSettings, updatePartnerPlanSettings } from "../controllers/partnerPlanController.js";
import { protect, adminOnly, staffOnly, superAdminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrative operations
 */

router.use(protect, staffOnly);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users with partner data
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/users", staffOnly, getAllUsers);
router.put("/users/:id", superAdminOnly, upload.single('profile_photo'), updateUser);
router.delete("/users/:id", superAdminOnly, deleteUser);

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get administrative dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
router.get("/stats", getDashboardStats);

/**
 * @swagger
 * /api/admin/partners/{id}/status:
 *   put:
 *     summary: Update partner application status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Approved, Rejected]
 *     responses:
 *       200:
 *         description: Status updated
 */
router.put("/partners/:id/status", updatePartnerStatus);
router.put("/partners/:id/commission", updatePartnerCommission);
router.get("/partners/:id/customers", getPartnerCustomers);

/**
 * @swagger
 * /api/admin/orders/{id}/status:
 *   put:
 *     summary: Update order status and timeline
 *     tags: [Admin]
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
 *               status: { type: string }
 *               remarks: { type: string }
 *     responses:
 *       200:
 *         description: Order updated
 */
router.put("/orders/:id/status", updateOrderStatus);
router.get("/orders", getAllOrders);

/**
 * @swagger
 * /api/admin/export/users:
 *   get:
 *     summary: Export all users to Excel
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Excel file
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get("/export/users", superAdminOnly, exportUsersExcel);

router.route("/partner-plans")
    .get(getPartnerPlanSettings)
    .put(updatePartnerPlanSettings);

router.post("/upload", upload.single('file'), uploadMedia);

export default router;
