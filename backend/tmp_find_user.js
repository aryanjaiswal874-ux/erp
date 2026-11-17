import User from "./models/User.js";
import "./models/index.js"; // to init associations

async function findUser() {
    try {
        const user = await User.findOne({ where: { email: "rishiisingh1405@gmail.com" } });
        console.log(JSON.stringify(user, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

findUser();
