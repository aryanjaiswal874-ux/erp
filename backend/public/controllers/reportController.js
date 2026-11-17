import { Order, Partner, User, Product, Customer, Setting, Sequelize } from "../models/index.js";
const { Op } = Sequelize;

// @desc    Get Master Report Stats
// @route   GET /api/reports/master
// @access  Private/Admin
export const getMasterReport = async (req, res) => {
    try {
        // 1. Order Statistics
        const orderStats = await Order.findAll({
            attributes: [
                'status',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
                [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount']
            ],
            group: ['status'],
            raw: true
        });

        // Parse order stats
        let totalRevenue = 0;
        let pendingAmount = 0;
        let successOrders = 0;
        let failedOrders = 0;

        const statsMap = {};
        orderStats.forEach(stat => {
            const amount = parseFloat(stat.total_amount) || 0;
            const count = parseInt(stat.count) || 0;
            statsMap[stat.status] = { count, amount };

            if (stat.status === 'Paid' || stat.status === 'Completed' || stat.status === 'Success') {
                totalRevenue += amount;
                successOrders += count;
            } else if (stat.status === 'Pending') {
                pendingAmount += amount;
            } else if (stat.status === 'Failed' || stat.status === 'Cancelled') {
                failedOrders += count;
            }
        });

        // 2. Partner Statistics
        const partnerStats = await Partner.count({
            group: ['status']
        });

        // Partner Registration Revenue
        const feeSetting = await Setting.findByPk('partner_registration_fee');
        const regFee = feeSetting ? Number(feeSetting.value) : 1000;

        // Assuming 'Approved' partners have paid, or check 'payment_status' if available
        // Let's use the explicit payment_status if your Partner model has it.
        // Based on previous files, Partner has 'payment_status'.
        const paidPartnersCount = await Partner.count({
            where: { payment_status: 'Paid' }
        });
        const partnerRevenue = paidPartnersCount * regFee;

        // Add Partner Revenue to Total Income
        const grandTotalIncome = totalRevenue + partnerRevenue;

        res.json({
            financials: {
                total_income: grandTotalIncome,
                order_revenue: totalRevenue,
                partner_fees: partnerRevenue,
                pending_revenue: pendingAmount
            },
            orders: {
                total: successOrders + failedOrders + (statsMap['Pending']?.count || 0),
                success: successOrders,
                failed: failedOrders,
                pending: statsMap['Pending']?.count || 0,
                breakdown: statsMap
            },
            partners: {
                total_registered: await Partner.count(),
                approved: await Partner.count({ where: { status: 'Approved' } }),
                pending: await Partner.count({ where: { status: 'Pending' } }),
                revenue_generated: partnerRevenue
            }
        });

    } catch (error) {
        console.error("Master Report Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get User Wise Income
// @route   GET /api/reports/users
// @access  Private/Admin
export const getUserWiseReport = async (req, res) => {
    try {
        const topUsers = await Order.findAll({
            attributes: [
                'userId',
                [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_spent'],
                [Sequelize.fn('COUNT', Sequelize.col('Order.id')), 'order_count']
            ],
            include: [{
                model: User,
                attributes: ['full_name', 'email', 'mobile']
            }],
            where: {
                status: ['Paid', 'Completed', 'Success'] // Adjust based on your status enums
            },
            group: ['userId', 'User.id'],
            order: [[Sequelize.literal('total_spent'), 'DESC']],
            limit: 50
        });

        res.json(topUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Partner Performance Report
// @route   GET /api/reports/partners
// @access  Private/Admin
export const getPartnerPerformance = async (req, res) => {
    try {
        // Fetch all partners with their User details
        const partners = await Partner.findAll({
            include: [{
                model: User,
                attributes: ['full_name', 'email', 'mobile']
            }, {
                model: Customer,
                attributes: ['id'] // Just to count
            }]
        });

        // For each partner, calculate revenue generated
        // This is expensive if we have many partners. 
        // Better to use a raw query or optimized grouping, but for now map is explicit.

        const report = await Promise.all(partners.map(async (p) => {
            // Count orders from this partner's customers
            // We need to find all orders where customerId IN (p.Customers)

            const customerIds = p.Customers.map(c => c.id);

            let revenue = 0;
            let orderCount = 0;

            if (customerIds.length > 0) {
                const result = await Order.findAll({
                    attributes: [
                        [Sequelize.fn('SUM', Sequelize.col('amount')), 'revenue'],
                        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
                    ],
                    where: {
                        customerId: { [Op.in]: customerIds },
                        status: ['Paid', 'Completed', 'Success']
                    },
                    raw: true
                });

                revenue = parseFloat(result[0].revenue) || 0;
                orderCount = parseInt(result[0].count) || 0;
            }

            return {
                id: p.id,
                name: p.User?.full_name || 'Unknown',
                email: p.User?.email,
                mobile: p.User?.mobile,
                status: p.status,
                customers_count: p.Customers.length,
                orders_count: orderCount,
                revenue_generated: revenue,
                // Commission is typically a percentage of revenue.
                // If dynamic, we can't easily calc here without history.
                // For now, let's assume a flat estimation or just show revenue.
            };
        }));

        // Sort by revenue descending
        report.sort((a, b) => b.revenue_generated - a.revenue_generated);

        res.json(report);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
