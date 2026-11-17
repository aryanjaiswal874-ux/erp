import "dotenv/config";
import { generateMAKMemberDocuments } from "./utils/mak/generateMAKDocuments.js";
import fs from "fs";

async function run() {
    const dummyMember = {
        id: "testm123_final",
        fullName: "Final Test Member",
        membershipType: "State Director",
        phone: "919999999999",
        dob: "1985-05-15",
        address: "Final Test Address, Bihar - 800001",
        photo: null
    };

    try {
        const docs = await generateMAKMemberDocuments(dummyMember);
        fs.writeFileSync("test-result.txt", "SUCCESS: " + JSON.stringify(docs));
    } catch (err) {
        fs.writeFileSync("test-result.txt", "ERROR: " + err.message + "\n" + err.stack);
    }
}

run();
