import express from "express";
import { getMasterReport, getUserWiseReport, getPartnerPerformance } from "../controllers/reportController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/master", getMasterReport);
router.get("/users", getUserWiseReport);
router.get("/partners", getPartnerPerformance);

export default router;
