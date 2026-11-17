import express from "express";
import { getAllBlogs, createBlog, updateBlog, deleteBlog, getBlogById } from "../controllers/blogController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management API
 */

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: isPublished
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of blogs
 */
router.get("/", getAllBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog details
 */
router.get("/:id", getBlogById);

// Admin only routes
/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               type:
 *                 type: string
 *               mediaUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created
 */
router.post("/", authenticate, authorizeAdmin, createBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Blog updated
 */
router.put("/:id", authenticate, authorizeAdmin, updateBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */
router.delete("/:id", authenticate, authorizeAdmin, deleteBlog);

/**
 * @swagger
 * /api/blogs/upload:
 *   post:
 *     summary: Upload a file for blog media (Admin only)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 */
router.post("/upload", authenticate, authorizeAdmin, upload.array('files', 10), (req, res) => {
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: "No files uploaded" });
    const urls = req.files.map(file => `${process.env.APP_URL || 'https://api.sbgmdigital.com'}/uploads/${file.filename}`);
    res.json({ urls });
});

export default router;
