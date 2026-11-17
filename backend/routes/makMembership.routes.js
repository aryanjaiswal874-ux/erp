import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
    getMembershipPlans,
    getAllMembershipPlans,
    createMembershipPlan,
    updateMembershipPlan,
    deleteMembershipPlan
} from "../controllers/makMembershipController.js";

const router = express.Router();

// Public route to get active plans for the join page
router.get("/", getMembershipPlans);

// Admin routes to manage plans
router.get("/all", protect, admin, getAllMembershipPlans);
router.post("/", protect, admin, createMembershipPlan);
router.put("/:id", protect, admin, updateMembershipPlan);
router.delete("/:id", protect, admin, deleteMembershipPlan);

export default router;
