import sequelize from "./config/db.js";

const updateRoleEnum = async () => {
    try {
        console.log("Applying ALTER TABLE to add 'super_admin' to role ENUM...");
        await sequelize.query(`
            ALTER TABLE \`Users\` 
            MODIFY COLUMN \`role\` ENUM('user', 'admin', 'partner', 'employee', 'super_admin') 
            NULL DEFAULT 'user';
        `);
        console.log("Database update successful!");
    } catch (error) {
        console.error("Database update failed:", error);
    } finally {
        await sequelize.close();
    }
};

updateRoleEnum();
