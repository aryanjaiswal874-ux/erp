import { User, Order, Product, Partner } from './models/index.js';
import sequelize from './config/db.js';

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected.");

        const userCount = await User.count();
        const orderCount = await Order.count();
        const productCount = await Product.count();
        const partnerCount = await Partner.count({ where: { status: "Approved" } });

        console.log("Counts:", { userCount, orderCount, productCount, partnerCount });

        const recentOrders = await Order.findAll({
            limit: 5,
            order: [["createdAt", "DESC"]],
            include: [User, Product]
        });
        console.log("Recent Orders count:", recentOrders.length);

        process.exit(0);
    } catch (err) {
        console.error("DEBUG SCRIPT ERROR:", err);
        process.exit(1);
    }
})();
