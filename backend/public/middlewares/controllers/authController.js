import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { User, Partner } from "../models/index.js";
import generateToken from "../utils/generateToken.js";
import { generatePassword } from "../utils/generatePassword.js";
import { transporter } from "../config/mailer.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
        let { full_name, mobile, email, address, state, city, pincode, is_partner } = req.body;

        // Standardization Logic
        if (full_name) {
            full_name = full_name
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }

        if (mobile) {
            // Remove non-digit characters
            mobile = mobile.toString().replace(/\D/g, '');
            // Take last 10 digits (removes +91 or 0 prefix)
            if (mobile.length > 10) {
                mobile = mobile.slice(-10);
            }
            // Ensure strict 10 digit rule for Indian numbers after cleanup 
            // (If user entered just 098..., slice(-10) fixes it. If they entered 789... it stays 789...)
        }

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const mobileExists = await User.findOne({ where: { mobile } });
        if (mobileExists) {
            return res.status(400).json({ message: "User already exists with this mobile number" });
        }

        // Generate random password
        const password = generatePassword(10);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            full_name,
            mobile,
            email,
            password: hashedPassword,
            address,
            state,
            city,
            pincode,
            is_partner_application_sent: is_partner || false,
        });

        if (is_partner) {
            await Partner.create({
                userId: user.id,
                status: "Pending",
                payment_status: "Pending",
            });
        }

        // Send Email
        const mailOptions = {
            from: process.env.DEFAULT_FROM_EMAIL,
            to: email,
            subject: "Welcome to SBGM - Your Account Credentials",
            html: `
            <h3>Welcome ${full_name},</h3>
            <p>Your account has been successfully created.</p>
            <p><strong>Username/Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p>Please login and change your password immediately.</p>
            <br/>
            <p>Regards,<br/>SBGM Team</p>
        `
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // Don't fail registration if email fails, but log it.
        }

        if (user) {
            res.status(201).json({
                _id: user.id,
                full_name: user.full_name,
                email: user.email,
                token: generateToken(user.id, user.role),
                role: user.role,
                profile_photo: user.profile_photo,
                is_partner_needed: is_partner,
                partner_fee: is_partner ? 1000 : 0, // Dynamic fee placeholder
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
            include: [{ model: Partner }]
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            if (user.is_active === false) {
                return res.status(403).json({ message: "Your account has been disabled. Please contact the administrator." });
            }
            res.json({
                _id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role,
                profile_photo: user.profile_photo,
                partner: user.Partner,
                token: generateToken(user.id, user.role),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Partner }]
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (user) {
            user.full_name = req.body.full_name !== undefined ? req.body.full_name : user.full_name;
            user.mobile = req.body.mobile !== undefined ? req.body.mobile : user.mobile;
            user.address = req.body.address !== undefined ? req.body.address : user.address;
            user.secondary_mobiles = req.body.secondary_mobiles !== undefined ? req.body.secondary_mobiles : user.secondary_mobiles;
            user.secondary_emails = req.body.secondary_emails !== undefined ? req.body.secondary_emails : user.secondary_emails;
            user.bank_details = req.body.bank_details !== undefined ? req.body.bank_details : user.bank_details;

            // New fields
            user.designation = req.body.designation !== undefined ? req.body.designation : user.designation;
            user.state = req.body.state !== undefined ? req.body.state : user.state;
            user.city = req.body.city !== undefined ? req.body.city : user.city;
            user.pincode = req.body.pincode !== undefined ? req.body.pincode : user.pincode;
            user.qualification = req.body.qualification !== undefined ? req.body.qualification : user.qualification;
            user.age = (req.body.age !== undefined && req.body.age !== "") ? req.body.age : null;
            user.gender = req.body.gender !== undefined ? req.body.gender : user.gender;


            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();

            const fullUser = await User.findByPk(updatedUser.id, {
                include: [{ model: Partner }]
            });

            res.json({
                _id: fullUser.id,
                full_name: fullUser.full_name,
                email: fullUser.email,
                role: fullUser.role,
                partner: fullUser.Partner,
                token: generateToken(fullUser.id, fullUser.role),
                // Return updated fields too just in case
                designation: fullUser.designation,
                state: fullUser.state,
                city: fullUser.city
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("❌ Profile Update Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get public users list (Combined User & MAKMember)
// @route   GET /api/auth/public-users
// @access  Public
export const getPublicUsers = async (req, res) => {
    try {
        const { role, designation, state, city } = req.query;
        const userWhere = {};

        if (role) userWhere.role = role;
        if (designation) userWhere.designation = designation;
        if (state) userWhere.state = state;
        if (city) userWhere.city = city;

        const users = await User.findAll({
            where: userWhere,
            attributes: [
                'id',
                'full_name',
                'email',
                'profile_photo',
                'role',
                'designation',
                'state',
                'city',
                'pincode',
                'qualification',
                'age',
                'gender',
                'address',
                'createdAt'
            ]
        });

        // Also fetch MAK Members
        const { MAKMember } = await import("../models/index.js");
        const makMembers = await MAKMember.findAll({
            where: { isActive: true },
            attributes: [
                'id',
                ['fullName', 'full_name'],
                ['photo', 'profile_photo'],
                ['membershipType', 'designation'],
                'address',
                'createdAt'
            ]
        });

        // Normalize MAK members to match User structure
        const normalizedMAK = makMembers.map(m => {
            const data = m.get({ plain: true });

            let memberCity = "India";
            if (data.address && typeof data.address === 'string') {
                const parts = data.address.split(',');
                if (parts.length > 1) {
                    memberCity = parts[parts.length - 2].trim();
                }
            }

            return {
                ...data,
                role: 'member',
                email: null,
                city: memberCity,
                state: null,
                pincode: null,
                qualification: null,
                age: null,
                gender: null
            };
        });

        // Combine and sort
        const combined = [...users, ...normalizedMAK].sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        res.status(200).json(combined);
    } catch (error) {
        console.error("Public Users Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate temporary password
        const newPassword = generatePassword(10);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        const mailOptions = {
            from: process.env.DEFAULT_FROM_EMAIL,
            to: email,
            subject: "SBGM - Password Reset",
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
                    <h2 style="color: #ff743d;">Password Reset Successful</h2>
                    <p>Hello ${user.full_name},</p>
                    <p>Your password has been reset to a temporary one as per your request.</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; font-weight: bold; font-family: monospace; text-align: center; font-size: 20px; letter-spacing: 2px;">
                        ${newPassword}
                    </div>
                    <p>Please log in and change your password from your profile settings immediately.</p>
                    <p>Regards,<br/>SBGM Support Team</p>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);

        res.json({ message: "Temporary password sent to email" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

/**
 * @desc    Change Password
 * @route   POST /api/auth/change-password
 * @access  Private
 */
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findByPk(req.user.id);

        if (user && (await bcrypt.compare(currentPassword, user.password))) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            await user.save();
            res.json({ message: "Password changed successfully" });
        } else {
            res.status(401).json({ message: "Invalid current password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update profile photo
// @route   PUT /api/auth/profile/photo
// @access  Private
export const updateProfilePhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await User.findByPk(req.user.id);
        if (user) {
            // Delete old photo if exists
            if (user.profile_photo) {
                const oldPath = user.profile_photo.startsWith('/') ? user.profile_photo.substring(1) : user.profile_photo;
                try {
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                } catch (e) {
                    console.error("Old photo delete failed", e);
                }
            }

            user.profile_photo = `/uploads/${req.file.filename}`;
            await user.save();
            res.json({ profile_photo: user.profile_photo });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
