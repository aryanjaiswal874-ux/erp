import sequelize from "../config/db.js";

const checkSchema = async () => {
    try {
        const [products] = await sequelize.query("DESCRIBE Products");
        console.log("Products table structure:");
        console.table(products);

        const [types] = await sequelize.query("DESCRIBE ProductTypes");
        console.log("ProductTypes table structure:");
        console.table(types);

        const [groups] = await sequelize.query("DESCRIBE ServiceGroups");
        console.log("ServiceGroups table structure:");
        console.table(groups);

        process.exit(0);
    } catch (error) {
        console.error("Error checking schema:", error);
        process.exit(1);
    }
};

checkSchema();
