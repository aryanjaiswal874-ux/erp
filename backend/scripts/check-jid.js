import { ERP_OfficeSetting } from "../models/index.js";
import { getSock } from "../utils/whatsappBot.js";

async function checkJID() {
    try {
        const settings = await ERP_OfficeSetting.findOne();
        if (!settings) {
            console.log("❌ No office settings found.");
            return;
        }

        console.log("------------------------------------------");
        console.log(`🔍 CURRENT REGISTERED JID: ${settings.whatsapp_group_jid}`);
        console.log("------------------------------------------");

        const sock = getSock();
        if (!sock) {
            console.log("❌ WhatsApp Bot is not connected. Connect first.");
            return;
        }

        console.log("🔍 Checking Bot Group Memberships...");
        const groups = await sock.groupFetchAllParticipating();
        const groupList = Object.values(groups);
        
        const found = groupList.find(g => g.id === settings.whatsapp_group_jid);
        
        if (found) {
            console.log(`✅ MATCH FOUND: Bot is a member of "${found.subject}"`);
        } else {
            console.log("❌ NO MATCH: Bot is NOT a member of the registered group.");
            console.log("\n📋 GROUPS THE BOT IS IN:");
            groupList.forEach(g => {
                console.log(`👉 ${g.subject} | JID: ${g.id}`);
            });
            console.log("\n💡 ACTION: Use one of the JIDs above in your Office Settings.");
        }
        console.log("------------------------------------------");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Since I can't run this as a standalone script easily without full ES module setup, 
// I'll just keep it here as reference or the user can run it.
checkJID();
