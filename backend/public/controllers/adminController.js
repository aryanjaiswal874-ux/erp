import { User, Order, Lead, Product, sequelize } from "../models/index.js";
import { Op } from "sequelize";
import { sendWhatsAppText, sendWhatsAppImage, sendWhatsAppVideo, sendWhatsAppDoc } from "../utils/whatsappService.js";
import fs from "fs";

// @desc    Get admin statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
    try {
        const userCount = await User.count();
        const orderCount = await Order.count();
        const leadCount = await Lead.count();
        const productCount = await Product.count();

        const recentOrders = await Order.findAll({
            limit: 5,
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: User,
                    attributes: ["full_name", "email"]
                },
                {
                    model: Product,
                    attributes: ["title"]
                }
            ]
        });

        res.json({
            users: userCount,
            orders: orderCount,
            leads: leadCount,
            products: productCount,
            recentOrders: recentOrders
        });
    } catch (error) {
        console.error("❌ Admin Stats Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};// @desc    Get all users for management
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// @desc    Send WhatsApp message from connected bot
// @route   POST /api/admin/send-whatsapp
// @access  Private/Admin
export const sendWhatsAppMessage = async (req, res) => {
    try {
        const { number, message, messageType, mediaUrl, fileName } = req.body;
        if (!number) return res.status(400).json({ message: "Number is required" });

        let result;
        switch (messageType) {
            case "image":
                result = await sendWhatsAppImage(number, message, mediaUrl);
                break;
            case "video":
                result = await sendWhatsAppVideo(number, message, mediaUrl);
                break;
            case "document":
                result = await sendWhatsAppDoc(number, mediaUrl, fileName);
                break;
            case "text":
            default:
                result = await sendWhatsAppText(number, message);
                break;
        }

        if (result.success) {
            res.status(200).json({ status: "sent", result: result.result });
        } else {
            res.status(500).json({ status: "failed", error: result.error });
        }
    } catch (error) {
        console.error("❌ Send WhatsApp Error:", error);
        res.status(500).json({ status: "failed", message: error.message });
    }
};

// @desc    Update user details
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prevent updating super_admin role unless requester is also super_admin
        if (req.body.role === 'super_admin' && req.user.role !== 'super_admin') {
            return res.status(403).json({ message: "Only super admins can assign super admin role" });
        }

        // Handle file upload for profile photo
        if (req.file) {
            // Delete old photo
            if (user.profile_photo) {
                const oldPath = user.profile_photo.startsWith('/') ? user.profile_photo.substring(1) : user.profile_photo;
                try {
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                } catch (e) {}
            }
            user.profile_photo = `/uploads/${req.file.filename}`;
        }

        // Update other fields
        const fieldsToUpdate = [
            "full_name", "email", "mobile", "role", "designation", 
            "is_active", "smartflo_agent_id", "smartflo_caller_id", 
            "call_access", "state", "city", "pincode", "address", "gross_salary",
            "joining_date", "upi_id", "work_mode", "age", "gender", 
            "qualification", "bank_details", "office_in_time", "office_out_time", "week_offs",
            "sunday_in_time", "sunday_out_time"
        ];

        fieldsToUpdate.forEach(field => {
            if (req.body[field] !== undefined) {
                // Handle booleans coming from FormData as strings
                if (req.body[field] === 'true' || req.body[field] === true) user[field] = true;
                else if (req.body[field] === 'false' || req.body[field] === false) user[field] = false;
                else if (req.body[field] === '') user[field] = null;
                else user[field] = req.body[field];
            }
        });

        await user.save();
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("❌ Update User Error:", error);
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/SuperAdmin
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Only super_admin can delete
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({ message: "Unauthorized. Super Admin access required." });
        }

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("❌ Delete User Error:", error);
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};
