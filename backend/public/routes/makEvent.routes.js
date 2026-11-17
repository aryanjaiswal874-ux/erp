import express from "express";
import {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
} from "../controllers/makEventController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", protect, getEvents);

router.post(
    "/",
    protect,
    adminOnly,
    upload.single("image"),
    createEvent
);

router.patch(
    "/:id",
    protect,
    adminOnly,
    upload.single("image"),
    updateEvent
);

router.delete("/:id", protect, adminOnly, deleteEvent);

export default router;
