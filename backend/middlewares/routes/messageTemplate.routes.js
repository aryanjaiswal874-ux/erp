import express from "express";
import {
    createTemplate,
    getTemplates,
    deleteTemplate,
    updateTemplate
} from "../controllers/messageTemplate.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createTemplate);
router.get("/", getTemplates);
router.delete("/:id", deleteTemplate);
router.put("/:id", updateTemplate);

export default router;
