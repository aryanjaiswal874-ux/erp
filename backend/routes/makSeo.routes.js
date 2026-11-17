import express from "express";
import { getMakSeo, updateMakSeo } from "../controllers/makSeoController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: MAK SEO
 *   description: SEO settings for MAK frontend
 */

/**
 * @swagger
 * /api/mak/seo:
 *   get:
 *     summary: Get MAK SEO settings
 *     tags: [MAK SEO]
 */
router.get("/", getMakSeo);

/**
 * @swagger
 * /api/mak/seo:
 *   post:
 *     summary: Update MAK SEO settings
 *     tags: [MAK SEO]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authenticate, authorizeAdmin, updateMakSeo);

export default router;
