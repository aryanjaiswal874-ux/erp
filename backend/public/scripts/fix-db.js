import sequelize from "../config/db.js";
import { LeadHistory } from "../models/index.js";

const fixDatabase = async () => {
    try {
        console.log("Synchronizing LeadHistory model...");
        await LeadHistory.sync({ alter: true });
        console.log("LeadHistory table synchronized successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error synchronizing LeadHistory:", error);
        process.exit(1);
    }
};

fixDatabase();
