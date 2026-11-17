import express from "express";
import {
  generatePartnerCertificateForPartnerId,
  getMyPartnerCertificateMeta,
  downloadMyPartnerCertificatePdf,
  verifyPartnerCertificatePublic,
  sendPartnerCertificateEmail,
  downloadPartnerCertificatePdfForAdmin,
  sendPartnerPdfEmailFromFrontend,
} from "../controllers/certificateController.js";
import { protect, adminOnly, partnerOnly } from "../middlewares/authMiddleware.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// Public verification
router.get("/verify/partner/:certificateId", verifyPartnerCertificatePublic);

// Partner (authenticated) - meta + pdf
router.get("/me/partner/meta", protect, partnerOnly, getMyPartnerCertificateMeta);
router.get("/me/partner/pdf", protect, partnerOnly, downloadMyPartnerCertificatePdf);

// Admin generation (usually called automatically on approval)
router.post(
  "/partner/:partnerId/generate",
  protect,
  adminOnly,
  generatePartnerCertificateForPartnerId
);

router.post(
  "/partner/:partnerId/send-email",
  protect,
  adminOnly,
  sendPartnerCertificateEmail
);

router.get(
  "/admin/partner/:partnerId/pdf",
  protect,
  adminOnly,
  downloadPartnerCertificatePdfForAdmin
);

// New: Accept PDF from frontend and email it
router.post(
  "/partner/:partnerId/send-pdf",
  protect,
  adminOnly,
  upload.single("pdf"),
  sendPartnerPdfEmailFromFrontend
);

export default router;

