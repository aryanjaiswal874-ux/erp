import sequelize from "./config/db.js";
const queryInterface = sequelize.getQueryInterface();
try {
    const info = await queryInterface.describeTable('ERP_holidays');
    console.log(JSON.stringify(info, null, 2));
} catch (e) {
    console.error(e.message);
} finally {
    process.exit();
}
