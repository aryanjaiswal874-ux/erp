import express from "express";
import {
    createTicket,
    getMyTickets,
    getAllTickets,
    getTicketById,
    replyTicket,
    updateTicketStatus
} from "../controllers/ticketController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
    .post(protect, createTicket)
    .get(protect, getMyTickets);

router.get("/all", protect, adminOnly, getAllTickets);

router.route("/:id")
    .get(protect, getTicketById)
    .put(protect, adminOnly, updateTicketStatus);

router.post("/:id/reply", protect, replyTicket);

export default router;
