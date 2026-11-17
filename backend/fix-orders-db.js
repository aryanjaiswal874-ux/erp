import sequelize from './config/db.js';

(async () => {
    try {
        const queryInterface = sequelize.getQueryInterface();

        console.log("Checking Orders table...");
        const tableInfo = await queryInterface.describeTable('Orders');
        const columns = Object.keys(tableInfo);

        if (!columns.includes('quantity')) {
            console.log("Adding 'quantity' column...");
            await sequelize.query("ALTER TABLE Orders ADD COLUMN quantity INT NOT NULL DEFAULT 1");
        }

        if (!columns.includes('unit_price')) {
            console.log("Adding 'unit_price' column...");
            // We set a default of 0.00 or copy from amount if possible, 
            // but for simplicity let's just add it with default 0
            await sequelize.query("ALTER TABLE Orders ADD COLUMN unit_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00");
            // If there's an existing amount, maybe unit_price = amount / quantity
            await sequelize.query("UPDATE Orders SET unit_price = amount WHERE unit_price = 0");
        }

        if (!columns.includes('discount')) {
            console.log("Adding 'discount' column...");
            await sequelize.query("ALTER TABLE Orders ADD COLUMN discount DECIMAL(10, 2) NOT NULL DEFAULT 0.00");
        }

        console.log("Database schema updated successfully.");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
})();
