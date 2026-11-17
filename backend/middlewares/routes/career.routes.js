import express from "express";
import {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    applyForJob,
    getApplications,
    updateApplicationStatus,
} from "../controllers/jobController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Careers
 *   description: Job postings and applications
 */

/**
 * @swagger
 * /api/careers:
 *   get:
 *     summary: List all active job openings
 *     tags: [Careers]
 *     responses:
 *       200:
 *         description: List of jobs
 *   post:
 *     summary: Create a new job posting (Admin)
 *     tags: [Careers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, type, location]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               type: { type: string, enum: [Full-Time, Part-Time, Remote, Internship] }
 *               location: { type: string }
 *               department: { type: string }
 *               experience: { type: string }
 *     responses:
 *       201:
 *         description: Job created
 */
router.route("/")
    .get(getJobs)
    .post(protect, adminOnly, createJob);

/**
 * @swagger
 * /api/careers/applications:
 *   get:
 *     summary: Get all job applications (Admin)
 *     tags: [Careers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of applications
 */
router.get("/applications", protect, adminOnly, getApplications);

/**
 * @swagger
 * /api/careers/applications/{id}:
 *   put:
 *     summary: Update application status (Admin)
 *     tags: [Careers]
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
 *               status: { type: string, enum: [Reviewing, Shortlisted, Rejected, Hired] }
 *     responses:
 *       200:
 *         description: Status updated
 */
router.put("/applications/:id", protect, adminOnly, updateApplicationStatus);

/**
 * @swagger
 * /api/careers/{id}/apply:
 *   post:
 *     summary: Submit a job application
 *     tags: [Careers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [full_name, mobile, email, resume]
 *             properties:
 *               full_name: { type: string }
 *               mobile: { type: string }
 *               email: { type: string }
 *               cover_note: { type: string }
 *               resume: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Application submitted
 */
router.post("/:id/apply", upload.single("resume"), applyForJob);

router.route("/:id")
    .get(getJobById)
    .put(protect, adminOnly, updateJob)
    .delete(protect, adminOnly, deleteJob);

export default router;
