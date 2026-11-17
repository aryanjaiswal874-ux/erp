import { Ticket, TicketMessage, User } from "../models/index.js";

// @desc    Create ticket
// @route   POST /api/support
// @access  Private
export const createTicket = async (req, res) => {
    try {
        const { subject, category, priority, message } = req.body;

        // Create Ticket Parent
        const ticket = await Ticket.create({
            userId: req.user.id,
            subject,
            category: category || 'General', // Needs model update or ignore if not in model
            priority: priority || 'Medium', // Needs model update or ignore
            status: 'Open'
        });

        // Create Initial Message
        if (message) {
            await TicketMessage.create({
                ticketId: ticket.id,
                senderId: req.user.id,
                senderRole: 'user',
                message
            });
        }

        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my tickets
// @route   GET /api/support
// @access  Private
export const getMyTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']],
            include: [{
                model: TicketMessage,
                limit: 1,
                order: [['createdAt', 'DESC']]
            }]
        });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all tickets (Admin)
// @route   GET /api/support/all
// @access  Private/Admin
export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            include: [
                { model: User, attributes: ['full_name', 'email', 'mobile'] },
                { model: TicketMessage, limit: 1, order: [['createdAt', 'DESC']] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get ticket details with messages
// @route   GET /api/support/:id
// @access  Private
export const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['full_name', 'email'] },
                { model: TicketMessage, order: [['createdAt', 'ASC']] }
            ]
        });

        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        // Authorization check
        if (req.user.role !== 'admin' && ticket.userId !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reply to ticket
// @route   POST /api/support/:id/reply
// @access  Private
export const replyTicket = async (req, res) => {
    try {
        const { message, status } = req.body;
        const ticket = await Ticket.findByPk(req.params.id);

        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        // Add Message
        const reply = await TicketMessage.create({
            ticketId: ticket.id,
            senderId: req.user.id,
            senderRole: req.user.role === 'admin' ? 'admin' : 'user',
            message
        });

        // Update Status if provided
        if (status) {
            ticket.status = status;
        } else if (req.user.role === 'admin') {
            ticket.status = 'In Progress'; // Auto update if admin replies
        } else {
            ticket.status = 'Open'; // Re-open if user replies
        }
        await ticket.save();

        res.json(reply);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update ticket status
// @route   PUT /api/support/:id
// @access  Private/Admin
export const updateTicketStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const ticket = await Ticket.findByPk(req.params.id);

        if (ticket) {
            ticket.status = status || ticket.status;
            await ticket.save();
            res.json(ticket);
        } else {
            res.status(404).json({ message: "Ticket not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
