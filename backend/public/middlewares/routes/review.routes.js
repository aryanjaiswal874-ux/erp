import express from "express";
import { getAllReviews, createReview, updateReview, deleteReview } from "../controllers/reviewController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management API
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all active reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get("/", getAllReviews);

// Admin only routes
/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a testimonial
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authenticate, authorizeAdmin, createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a testimonial
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authenticate, authorizeAdmin, updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a testimonial
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authenticate, authorizeAdmin, deleteReview);

export default router;
