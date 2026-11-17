import express from "express";
import {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Service procurement and tracking
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new service order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId: { type: string }
 *               paymentMethod: { type: string }
 *     responses:
 *       201:
 *         description: Order created
 *   get:
 *     summary: Get all orders (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.route("/").post(protect, addOrderItems).get(protect, adminOnly, getOrders);

/**
 * @swagger
 * /api/orders/myorders:
 *   get:
 *     summary: Get logged-in user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 */
router.route("/myorders").get(protect, getMyOrders);
router.route("/my").get(protect, getMyOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Order details
 */
router.route("/:id").get(protect, getOrderById);

export default router;
