import express from "express";
import {
    enrollMember,
    getMembers,
    getPublicMembers,
    resendWelcome,
    getMemberProfile,
    updateMember,
    deleteMember,
    sendIDCardWhatsApp,
    sendCertificateWhatsApp
} from "../controllers/makMemberController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/mak/members:
 *   post:
 *     summary: Enroll new member
 *     tags: [MAK Members]
 *     security: [{ bearerAuth: [] }]
 */
router.post(
    "/",
    protect,
    adminOnly,
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "paymentReceipt", maxCount: 1 },
        { name: "documents", maxCount: 10 }
    ]),
    enrollMember
);

/**
 * @swagger
 * /api/mak/members:
 *   get:
 *     summary: List all members
 *     tags: [MAK Members]
 */
router.get("/public", getPublicMembers);
router.post("/resend-welcome/:id", protect, adminOnly, resendWelcome);
router.post("/send-idcard/:id", protect, adminOnly, sendIDCardWhatsApp);
router.post("/send-certificate/:id", protect, adminOnly, sendCertificateWhatsApp);
router.get("/", protect, adminOnly, getMembers);

/**
 * @swagger
 * /api/mak/members/profile:
 *   get:
 *     summary: Get logged-in member profile
 *     tags: [MAK Members]
 */
router.get("/profile", protect, getMemberProfile);

/**
 * @swagger
 * /api/mak/members/{id}:
 *   patch:
 *     summary: Update member details
 *     tags: [MAK Members]
 */
router.patch(
    "/:id",
    protect,
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "paymentReceipt", maxCount: 1 },
        { name: "documents", maxCount: 10 }
    ]),
    updateMember
);

/**
 * @swagger
 * /api/mak/members/{id}:
 *   delete:
 *     summary: Delete member
 *     tags: [MAK Members]
 */
router.delete("/:id", protect, adminOnly, deleteMember);

export default router;
