import { Order, Product, User, Payment, ProductType, ServiceGroup, Partner } from "../models/index.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
    try {
        const { productId, quantity = 1, amount: reqAmount } = req.body;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const unitPrice = parseFloat(product.price);
        let totalDiscount = 0;
        let finalAmount = unitPrice * quantity;

        // Apply Partner Discount if user is partner.
        if (req.user.role === 'partner') {
            const partner = await Partner.findOne({ where: { userId: req.user.id } });

            // Logic: Maximize the benefit for the partner between product specific discount and partner global commission
            const globalCommission = partner ? (partner.commission_percentage || 0) : 0;
            const productSpecificDiscount = product.partner_discount || 0;

            // If neither is set, fallback to a base 10% for partners as per previous logic (or 0 if preferred, but keeping consistency)
            const effectiveDiscountPercent = Math.max(globalCommission, productSpecificDiscount) || 10;

            totalDiscount = (unitPrice * (effectiveDiscountPercent / 100)) * quantity;
            finalAmount = finalAmount - totalDiscount;
        }

        const order = await Order.create({
            userId: req.user.id,
            productId,
            quantity,
            unit_price: unitPrice,
            discount: totalDiscount,
            amount: finalAmount,
            status: "Pending",
            timeline: [{ status: "Created", date: new Date(), remarks: "Order Initiated" }]
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ["full_name", "email"] },
                {
                    model: Product,
                    attributes: ["title", "image", "price", "description"],
                    include: [
                        { model: ProductType, attributes: ['name'] },
                        { model: ServiceGroup, attributes: ['name'] }
                    ]
                },
                { model: Payment }
            ],
        });

        if (order) {
            // Check permissions (Admin or Order Owner)
            if (req.user.role === 'admin' || order.userId === req.user.id) {
                res.json(order);
            } else {
                res.status(401).json({ message: "Not authorized to view this order" });
            }
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [{
                model: Product,
                include: [
                    { model: ProductType, attributes: ['name'] },
                    { model: ServiceGroup, attributes: ['name'] }
                ]
            }],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{ model: User, attributes: ["id", "full_name"] }, { model: Product }],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
