import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import SmartfloCaller from "../models/SmartfloCaller.js";
import { getSmartfloToken, initiateCall } from "../utils/smartfloClient.js";

/**
 * @desc    Get Smartflo token
 * @route   GET /api/smartflo/token
 * @access  Private
 */
export const getToken = asyncHandler(async (req, res) => {
    try {
        const token = await getSmartfloToken();
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: "Failed to authenticate Smartflo", error: error.message });
    }
});

/**
 * @desc    Initiate a call
 * @route   POST /api/smartflo/call
 * @access  Private
 */
export const initiateCallController = asyncHandler(async (req, res) => {
    const { lead_id, destination_number } = req.body;

    // Fetch fresh user data to get smartflo_agent_id
    const user = await User.findByPk(req.user.id);

    if (!user || !user.smartflo_agent_id) {
        return res.status(403).json({ message: "Your account is not configured with a Smartflo Agent ID." });
    }

    if (!user.smartflo_caller_id) {
        return res.status(403).json({ message: "Your account is not configured with a Smartflo Caller ID." });
    }

    if (!destination_number) {
        return res.status(400).json({ message: "Destination number is required." });
    }

    try {
        const result = await initiateCall(user.smartflo_agent_id, destination_number, user.smartflo_caller_id);
        res.status(200).json({ success: true, message: "Call initiated successfully", result });
    } catch (error) {
        res.status(500).json({
            message: "Failed to initiate call",
            error: error.message
        });
    }
});

/**
 * @desc    Get all Smartflo Callers
 * @route   GET /api/smartflo/callers
 * @access  Private (Admin)
 */
export const getCallers = asyncHandler(async (req, res) => {
    const callers = await SmartfloCaller.findAll({
        order: [['createdAt', 'DESC']]
    });
    res.status(200).json(callers);
});

/**
 * @desc    Add a Smartflo Caller
 * @route   POST /api/smartflo/callers
 * @access  Private (Admin)
 */
export const addCaller = asyncHandler(async (req, res) => {
    const { company_name, caller_number } = req.body;

    if (!company_name || !caller_number) {
        return res.status(400).json({ message: "Company name and Caller number are required." });
    }

    const newCaller = await SmartfloCaller.create({ company_name, caller_number });
    res.status(201).json(newCaller);
});

/**
 * @desc    Delete a Smartflo Caller
 * @route   DELETE /api/smartflo/callers/:id
 * @access  Private (Admin)
 */
export const deleteCaller = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const caller = await SmartfloCaller.findByPk(id);

    if (!caller) {
        return res.status(404).json({ message: "Caller not found." });
    }

    await caller.destroy();
    res.status(200).json({ message: "Caller removed successfully." });
});
