import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

/**
 * Saves a base64 image to the filesystem
 * @param {string} base64Data - The base64 string including prefix
 * @param {string} subFolder - The folder inside uploads/ to save to
 * @returns {string} - The relative path of the saved image
 */
export const saveBase64Image = (base64Data, subFolder = "attendance") => {
    if (!base64Data || !base64Data.startsWith("data:image")) return base64Data;

    try {
        const uploadsDir = path.join(process.cwd(), "uploads", subFolder);
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const format = base64Data.split(";")[0].split("/")[1];
        const fileName = `${uuidv4()}.${format}`;
        const filePath = path.join(uploadsDir, fileName);

        const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, "");
        fs.writeFileSync(filePath, Buffer.from(base64Content, "base64"));

        return `uploads/${subFolder}/${fileName}`;
    } catch (error) {
        console.error("Error saving base64 image:", error);
        return base64Data;
    }
};
