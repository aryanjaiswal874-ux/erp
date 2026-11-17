import asyncHandler from "express-async-handler";
import { MAKEvent } from "../models/index.js";

/**
 * @desc    Create a new event
 * @route   POST /api/mak/events
 * @access  Private (Admin only)
 */
export const createEvent = asyncHandler(async (req, res) => {
    const { title, description, date, location } = req.body;
    let image = null;

    if (req.file) {
        image = `/${req.file.path.replace(/\\/g, '/')}`;
    }

    const event = await MAKEvent.create({
        title,
        description,
        date,
        location,
        image,
    });

    res.status(201).json(event);
});

/**
 * @desc    Get all events
 * @route   GET /api/mak/events
 * @access  Public (Member/Admin)
 */
export const getEvents = asyncHandler(async (req, res) => {
    const events = await MAKEvent.findAll({
        where: { isActive: true },
        order: [['date', 'ASC']]
    });
    res.json(events);
});

/**
 * @desc    Update an event
 * @route   PATCH /api/mak/events/:id
 * @access  Private (Admin only)
 */
export const updateEvent = asyncHandler(async (req, res) => {
    const event = await MAKEvent.findByPk(req.params.id);

    if (event) {
        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.date = req.body.date || event.date;
        event.location = req.body.location || event.location;
        event.isActive = req.body.isActive !== undefined ? req.body.isActive : event.isActive;

        if (req.file) {
            event.image = `/${req.file.path.replace(/\\/g, '/')}`;
        }

        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } else {
        res.status(404).json({ message: "Event not found" });
    }
});

/**
 * @desc    Delete an event
 * @route   DELETE /api/mak/events/:id
 * @access  Private (Admin only)
 */
export const deleteEvent = asyncHandler(async (req, res) => {
    const event = await MAKEvent.findByPk(req.params.id);
    if (event) {
        await event.destroy();
        res.json({ message: "Event deleted" });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
});
