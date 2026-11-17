import User from "./models/User.js";
import "./models/index.js";

async function listUsers() {
    try {
        const users = await User.findAll({ attributes: ['full_name', 'email', 'role'] });
        console.log(JSON.stringify(users, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

listUsers();
