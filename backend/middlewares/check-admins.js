import { User } from './models/index.js';
import sequelize from './config/db.js';

(async () => {
    try {
        const admins = await User.findAll({ where: { role: 'admin' } });
        console.log("Admins Count:", admins.length);
        admins.forEach(a => console.log(`- ${a.full_name} (${a.email})`));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
