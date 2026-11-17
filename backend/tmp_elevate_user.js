import User from "./models/User.js";
import "./models/index.js";

async function elevateUser() {
    try {
        await User.update({ role: "super_admin" }, { where: { email: "rishi1405singh@gmail.com" } });
        console.log("User Rishi Singh elevated to super_admin");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

elevateUser();
