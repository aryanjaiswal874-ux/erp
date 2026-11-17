import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import { getToken, initiateCallController, getCallers, addCaller, deleteCaller } from "../controllers/smartfloController.js";
import { initiateCall } from "../utils/smartfloClient.js";

const router = express.Router();

router.get("/token", protect, getToken);
router.post("/call", protect, initiateCallController);

// Callers metadata Management
router.get("/callers", protect, getCallers);
router.post("/callers", protect, adminOnly, addCaller);
router.delete("/callers/:id", protect, adminOnly, deleteCaller);

export default router;
