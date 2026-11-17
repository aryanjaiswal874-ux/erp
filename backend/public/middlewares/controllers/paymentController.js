import Razorpay from "razorpay";
import crypto from "crypto";
import { Payment, Order, Partner, User } from "../models/index.js";
import { generateInvoicePDF } from "../utils/exportUtils.js";
import { transporter } from "../config/mailer.js";

const razorpaySBGM = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const razorpayMAK = new Razorpay({
    key_id: process.env.MAK_RAZORPAY_KEY_ID,
    key_secret: process.env.MAK_RAZORPAY_KEY_SECRET,
});

// Legacy reference (defaults to SBGM)
const razorpay = razorpaySBGM;

// @desc    Create Razorpay Order
// @route   POST /api/payments/create-order
// @access  Private
export const createPaymentOrder = async (req, res) => {
    try {
        const { amount, currency = "INR", receipt, project } = req.body;

        // Determine which Razorpay instance to use
        // If it's the public route or MAK/Foundation project
        const isPublic = req.originalUrl.includes('/public/');
        const rzpInstance = (isPublic || project === 'MAK' || project === 'Sarmfoundation') ? razorpayMAK : razorpaySBGM;

        const options = {
            amount: Math.round(amount * 100), // Amount in paisa
            currency,
            receipt,
            payment_capture: 1 // Auto-capture payment
        };

        const order = await rzpInstance.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create Razorpay Payment Link
// @route   POST /api/payments/create-link
// @access  Private
export const createPaymentLink = async (req, res) => {
    try {
        const { amount, description, customer, project } = req.body;

        // Determine which Razorpay instance to use
        const isPublic = req.originalUrl.includes('/public/');
        const rzpInstance = (isPublic || project === 'MAK' || project === 'Sarmfoundation') ? razorpayMAK : razorpaySBGM;

        const options = {
            amount: Math.round(amount * 100), // Amount in paisa
            currency: "INR",
            accept_partial: false,
            description: description || "Payment for service",
            customer: {
                name: customer.name || "Customer",
                email: customer.email || "",
                contact: customer.contact || ""
            },
            notify: {
                sms: false,
                email: false
            },
            reminder_enable: true,
            notes: {
                source: "Lead Management"
            },
            callback_url: `${process.env.FRONTEND_BASE_URL}/payment-success`,
            callback_method: "get"
        };

        const paymentLink = await rzpInstance.paymentLink.create(options);
        res.json(paymentLink);
    } catch (error) {
        console.error("Razorpay Link Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            entityId, // orderId or partnerId
            entityType, // "ORDER" or "PARTNER"
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        // Determine which secret to use
        const { project, type } = req.body;
        const secret = (project === 'MAK' || project === 'Sarmfoundation' || type === 'donation' || type === 'membership')
            ? process.env.MAK_RAZORPAY_KEY_SECRET
            : process.env.RAZORPAY_KEY_SECRET;

        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            // Payment success

            // 1. Record Payment
            await Payment.create({
                userId: req.user.id,
                amount: req.body.amount || 0, // Should retrieve from Razorpay order or pass from frontend, better verify from Razorpay API
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                status: "Success",
                method: "online"
            });

            // 2. Fullfill entity
            // 2. Fullfill entity
            if (entityType === "ORDER") {
                const order = await Order.findByPk(entityId);
                const user = await User.findByPk(req.user.id);

                if (order) {
                    order.status = "In Progress";
                    order.payment_id = razorpay_payment_id;
                    order.timeline = [...order.timeline, { status: "Paid", date: new Date(), remarks: "Payment Verified" }];
                    await order.save();

                    // Generate Invoice & Send Mail
                    try {
                        const invoiceBuffer = await generateInvoicePDF(order, user);
                        await transporter.sendMail({
                            from: process.env.SMTP_USER,
                            to: user.email,
                            subject: `Invoice for Order #${order.id}`,
                            html: `
                                <!DOCTYPE html>
                                <html>
                                <head>
                                    <meta charset="utf-8">
                                </head>
                                <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
                                    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; margin-top: 20px; margin-bottom: 20px;">
                                        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px; text-align: center;">
                                            <img src="https://sbgmdigital.com/logo.png" alt="SBGM" style="height: 50px; margin-bottom: 10px;" />
                                            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">Payment Successful</h1>
                                        </div>
                                        <div style="padding: 40px;">
                                            <p style="font-size: 16px; color: #1e293b; margin-bottom: 20px;">Dear <strong>${user.full_name}</strong>,</p>
                                            <p style="font-size: 15px; color: #64748b; line-height: 1.6; margin-bottom: 20px;">
                                                Thank you for your business. We have successfully received your payment for <strong>Order #${order.id}</strong>.
                                            </p>
                                            
                                            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 25px;">
                                                <p style="margin: 0 0 5px; color: #166534; font-size: 11px; text-transform: uppercase; font-weight: bold;">Amount Paid</p>
                                                <div style="color: #16a34a; font-weight: 800; font-size: 24px;">Rs. ${order.amount}</div>
                                                <p style="margin: 10px 0 0; font-size: 12px; color: #15803d; font-family: monospace;">Txn ID: ${razorpay_payment_id}</p>
                                            </div>

                                            <p style="font-size: 15px; color: #64748b; margin-bottom: 10px;">
                                                Please find the attached invoice for your records.
                                            </p>
                                            <p style="font-size: 15px; color: #64748b;">
                                                Best Regards,<br/><strong>SBGM Team</strong>
                                            </p>
                                        </div>
                                        <div style="background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
                                            <p style="margin: 0;">SBGM Digital India Pvt. Ltd.</p>
                                            <p style="margin: 5px 0 0;">Automated Payment System</p>
                                        </div>
                                    </div>
                                </body>
                                </html>
                            `,
                            attachments: [
                                {
                                    filename: `Invoice_${order.id}.pdf`,
                                    content: invoiceBuffer
                                }
                            ]
                        });
                    } catch (mailError) {
                        console.error("Failed to send invoice email:", mailError);
                    }
                }
            } else if (entityType === "ORDERS") {
                // Bulk verify for User Cart
                const { entityIds } = req.body; // Expect array of order IDs
                const user = await User.findByPk(req.user.id);

                if (entityIds && Array.isArray(entityIds)) {
                    for (const oid of entityIds) {
                        const order = await Order.findByPk(oid);
                        if (order) {
                            order.status = "In Progress";
                            order.payment_id = razorpay_payment_id;
                            order.timeline = [...(order.timeline || []), { status: "Paid", date: new Date(), remarks: "Payment Verified - Bulk" }];
                            await order.save();

                            // Generate Invoice & Send Mail (Optional: could bundle, but sending individual for now)
                            try {
                                const invoiceBuffer = await generateInvoicePDF(order, user);
                                await transporter.sendMail({
                                    from: process.env.SMTP_USER,
                                    to: user.email,
                                    subject: `Invoice for Order #${order.id}`,
                                    html: `
                                        <!DOCTYPE html>
                                        <html>
                                        <head>
                                            <meta charset="utf-8">
                                        </head>
                                        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
                                            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; margin-top: 20px; margin-bottom: 20px;">
                                                <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px; text-align: center;">
                                                    <img src="https://sbgmdigital.com/logo.png" alt="SBGM" style="height: 50px; margin-bottom: 10px;" />
                                                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">Payment Successful</h1>
                                                </div>
                                                <div style="padding: 40px;">
                                                    <p style="font-size: 16px; color: #1e293b; margin-bottom: 20px;">Dear <strong>${user.full_name}</strong>,</p>
                                                    <p style="font-size: 15px; color: #64748b; line-height: 1.6; margin-bottom: 20px;">
                                                        Thank you for your business. We have successfully received your payment for <strong>Order #${order.id}</strong>.
                                                    </p>
                                                    
                                                    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 25px;">
                                                        <p style="margin: 0 0 5px; color: #166534; font-size: 11px; text-transform: uppercase; font-weight: bold;">Amount Paid</p>
                                                        <div style="color: #16a34a; font-weight: 800; font-size: 24px;">Rs. ${order.amount}</div>
                                                        <p style="margin: 10px 0 0; font-size: 12px; color: #15803d; font-family: monospace;">Txn ID: ${razorpay_payment_id}</p>
                                                    </div>

                                                    <p style="font-size: 15px; color: #64748b; margin-bottom: 10px;">
                                                        Please find the attached invoice for your records.
                                                    </p>
                                                    <p style="font-size: 15px; color: #64748b;">
                                                        Best Regards,<br/><strong>SBGM Team</strong>
                                                    </p>
                                                </div>
                                                <div style="background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
                                                    <p style="margin: 0;">SBGM Digital India Pvt. Ltd.</p>
                                                    <p style="margin: 5px 0 0;">Automated Payment System</p>
                                                </div>
                                            </div>
                                        </body>
                                        </html>
                                    `,
                                    attachments: [
                                        {
                                            filename: `Invoice_${order.id}.pdf`,
                                            content: invoiceBuffer
                                        }
                                    ]
                                });
                            } catch (mailError) {
                                console.error("Failed to send invoice email:", mailError);
                            }
                        }
                    }
                }
            } else if (entityType === "PARTNER" || entityType === "MEMBER_APPLICATION") {
                const partner = await Partner.findByPk(entityId);
                const user = await User.findByPk(req.user.id);
                if (partner) {
                    partner.payment_status = "Paid";
                    await partner.save();

                    // Send Email for Member Application
                    if (entityType === "MEMBER_APPLICATION" || partner.plan_type) {
                        try {
                            await transporter.sendMail({
                                from: process.env.SMTP_USER,
                                to: user.email,
                                subject: `Application Received - ${partner.plan_type || 'Partner'} Membership`,
                                html: `
                                        <!DOCTYPE html>
                                        <html>
                                        <body style="font-family: 'Segoe UI', sans-serif; background-color: #f8fafc; padding: 20px;">
                                            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
                                                <div style="background: #1e293b; padding: 30px; text-align: center;">
                                                    <h1 style="color: white; margin: 0; font-size: 24px;">Application Received</h1>
                                                </div>
                                                <div style="padding: 40px;">
                                                    <p style="color: #1e293b; font-size: 16px;">Dear <strong>${user.name || user.full_name}</strong>,</p>
                                                    <p style="color: #64748b; line-height: 1.6;">
                                                        Thank you for applying to become a <strong>${partner.plan_type}</strong> at SBGM Digital India Pvt Ltd.
                                                    </p>
                                                    <p style="color: #64748b; line-height: 1.6;">
                                                        We have successfully received your payment of <strong style="color: #16a34a;">Rs. ${req.body.amount || 0}</strong>.
                                                    </p>
                                                    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 20px 0;">
                                                        <p style="margin: 0; color: #166534; font-size: 14px;"><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
                                                        <p style="margin: 5px 0 0; color: #166534; font-size: 14px;"><strong>Plan:</strong> ${partner.plan_type}</p>
                                                    </div>
                                                    <p style="color: #64748b; line-height: 1.6;">
                                                        Our team will review your application and contact you shortly at <strong>${user.mobile}</strong> or via this email.
                                                    </p>
                                                    <p style="color: #64748b; margin-top: 30px;">
                                                        Regards,<br/><strong>SBGM Team</strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </body>
                                        </html>
                                    `
                            });
                        } catch (mailError) {
                            console.error("Failed to send membership email:", mailError);
                        }
                    }
                }
            }

            res.json({ message: "Payment verified successfully" });
        } else {
            res.status(400).json({ message: "Invalid signature" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const verifyPublicPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            name,
            email,
            mobile,
            amount,
            type, // 'donation' or 'membership'
            tier
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        // Determine which secret to use
        const isPublic = req.originalUrl.includes('/public/');
        const secret = (isPublic || type === 'donation' || type === 'membership')
            ? process.env.MAK_RAZORPAY_KEY_SECRET
            : process.env.RAZORPAY_KEY_SECRET;

        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            // 1. Record Payment in DB
            await Payment.create({
                amount: amount || 0,
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                status: "Success",
                method: "online",
                remarks: `${type.toUpperCase()}: ${name} (${mobile}) ${tier ? '- ' + tier : ''}`
            });

            // 2. Send Acknowledgment Email to User
            try {
                await transporter.sendMail({
                    from: process.env.SMTP_USER,
                    to: email,
                    subject: `Acknowledgement - ${type === 'donation' ? 'Contribution' : 'Membership Application'} Received`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                            <div style="background: #1e293b; padding: 30px; text-align: center;">
                                <h1 style="color: white; margin: 0; font-size: 20px;">Payment Successful</h1>
                            </div>
                            <div style="padding: 30px; color: #333;">
                                <p>Dear <b>${name}</b>,</p>
                                <p>Thank you for your ${type === 'donation' ? 'generous contribution' : 'membership application'} to Manav Adhikar Kendra.</p>
                                
                                <div style="background: #f8fafc; padding: 20px; border-radius: 5px; margin: 20px 0;">
                                    <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase;">Transaction Details</p>
                                    <p style="margin: 10px 0 0; font-size: 18px; font-weight: bold; color: #16a34a;">Rs. ${amount}</p>
                                    <p style="margin: 5px 0 0; font-size: 13px; color: #64748b;">ID: ${razorpay_payment_id}</p>
                                    ${tier ? `<p style="margin: 5px 0 0; font-size: 13px; color: #64748b;">Member Level: ${tier}</p>` : ''}
                                </div>

                                <p>Our team will process your ${type} and send further credentials shortly.</p>
                                <p>Best Regards,<br/><b>Manav Adhikar Kendra</b></p>
                            </div>
                        </div>
                    `
                });
            } catch (mailErr) {
                console.error("Mail Error:", mailErr);
            }

            res.json({ success: true, message: "Payment verified and recorded" });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.error("Public Verify Error:", error);
        res.status(500).json({ message: error.message });
    }
};
