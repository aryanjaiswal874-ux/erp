import "dotenv/config";
import { generateMAKMemberDocuments } from "./utils/mak/generateMAKDocuments.js";
import fs from "fs/promises";
import path from "path";

const testGeneration = async () => {
    console.log("Starting Document Generation Test...");
    const dummyMember = {
        id: "testm123",
        fullName: "Test Member Name",
        membershipType: "Area Organiser",
        phone: "910000000000",
        dob: "1990-01-01",
        address: "Test Address, Ranchi, Jharkhand - 123456",
        photo: null
    };

    try {
        const docs = await generateMAKMemberDocuments(dummyMember);
        console.log("Docs generated:", docs);
    } catch (err) {
        console.error("FULL ERROR:", err);
    }
};

testGeneration();
