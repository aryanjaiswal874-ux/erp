import sequelize from "./config/db.js";

const checkRoleEnum = async () => {
    try {
        const [results] = await sequelize.query("SHOW COLUMNS FROM `Users` LIKE 'role';");
        console.log("Current role column definition:", results[0].Type);
    } catch (error) {
        console.error("Error checking database:", error);
    } finally {
        await sequelize.close();
    }
};

checkRoleEnum();
