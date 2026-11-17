import axios from "axios";
import FormData from "form-data";
import fs from "fs-extra";
import path from "path";
import { getSock } from "./whatsappBot.js";

const WA_API_URL = process.env.WHATSAPP_API_URL || "https://whatsappmak.manavadhikarkendra.org";

/**
 * Helper to clean number and append country code if needed
 */
const formatNumber = (number) => {
    if (!number) return "";
    if (number.includes("@")) return number; // Already a JID
    const cleanNumber = number.toString().replace(/[^0-9]/g, "");
    if (cleanNumber.length < 10) return cleanNumber; // Too short to be a real number, keep as is
    return cleanNumber.length === 10 ? "91" + cleanNumber : cleanNumber;
};

/**
 * Send a text message
 */
export const sendWhatsAppText = async (number, message) => {
    try {
        const sock = getSock();
        const targetJid = number.includes("@") ? number : `${formatNumber(number)}@s.whatsapp.net`;

        if (sock && sock.user) {
            console.log(`🚀 Sending [TEXT] to ${targetJid} via Local Bot`);
            try {
                await sock.sendMessage(targetJid, { text: message });
                return { success: true };
            } catch (localErr) {
                console.error(`Local Bot [TEXT] failed, falling back to API:`, localErr.message);
            }
        }

        const finalNumber = formatNumber(number).split("@")[0];
        console.log(`📡 Sending [TEXT] to ${finalNumber} via ${WA_API_URL} (Fallback)`);
        
        const response = await axios.post(`${WA_API_URL}/send`, {
            number: finalNumber,
            message: message
        });
        
        return { success: true, result: response.data };
    } catch (error) {
        console.error(`WhatsApp Text Error (${number}):`, error.response?.data || error.message);
        return { success: false, error: error.message };
    }
};

/**
 * Send an image with caption
 */
export const sendWhatsAppImage = async (number, caption, imagePath) => {
    try {
        const sock = getSock();
        const targetJid = number.includes("@") ? number : `${formatNumber(number)}@s.whatsapp.net`;

        if (sock && sock.user) {
            console.log(`🚀 Sending [IMAGE] to ${targetJid} via Local Bot`);
            try {
                let imageSource;
                if (imagePath.startsWith("http")) {
                    imageSource = { url: imagePath };
                } else if (fs.existsSync(imagePath)) {
                    imageSource = fs.readFileSync(imagePath);
                } else {
                    throw new Error(`File not found: ${imagePath}`);
                }

                await sock.sendMessage(targetJid, { 
                    image: imageSource,
                    caption: caption || ""
                });
                return { success: true };
            } catch (localErr) {
                console.error(`Local Bot [IMAGE] failed, falling back to API:`, localErr.message);
            }
        }

        const finalNumber = formatNumber(number).split("@")[0];
        console.log(`📡 Sending [IMAGE] to ${finalNumber} via ${WA_API_URL} (Fallback)`);

        const form = new FormData();
        form.append("number", finalNumber);
        form.append("caption", caption || "");
        
        if (fs.existsSync(imagePath)) {
            form.append("image", fs.createReadStream(imagePath));
        } else {
            throw new Error(`File not found: ${imagePath}`);
        }

        const response = await axios.post(`${WA_API_URL}/send-image`, form, {
            headers: { ...form.getHeaders() }
        });
        
        return { success: true, result: response.data };
    } catch (error) {
        console.error(`WhatsApp Image Error (${number}):`, error.response?.data || error.message);
        return { success: false, error: error.message };
    }
};

/**
 * Generic JID sender
 */
export const sendWhatsAppToJID = async (jid, message) => {
    return sendWhatsAppText(jid, message);
};

export const sendWhatsAppImageToJID = async (jid, caption, imagePath) => {
    return sendWhatsAppImage(jid, caption, imagePath);
};

/**
 * Send Base64 image
 */
export const sendWhatsAppBase64ImageToJID = async (jid, caption, base64Data) => {
    try {
        const sock = getSock();
        const targetJid = jid.includes("@") ? jid : `${formatNumber(jid)}@s.whatsapp.net`;

        if (sock && sock.user) {
            console.log(`🚀 Sending [B64 IMAGE] to ${targetJid} via Local Bot`);
            try {
                const base64Content = base64Data.split(';base64,').pop();
                const buffer = Buffer.from(base64Content, 'base64');

                await sock.sendMessage(targetJid, { 
                    image: buffer,
                    caption: caption || ""
                });
                return { success: true };
            } catch (localErr) {
                console.error(`Local Bot [B64 IMAGE] failed, falling back to API:`, localErr.message);
            }
        }

        const finalNumber = formatNumber(jid).split("@")[0];
        console.log(`📡 Sending [B64 IMAGE] to ${finalNumber} via ${WA_API_URL} (Fallback)`);
        
        const base64Content = base64Data.split(';base64,').pop();
        const buffer = Buffer.from(base64Content, 'base64');
        const tmpPath = path.join(process.cwd(), `tmp_img_${Date.now()}.png`);
        fs.writeFileSync(tmpPath, buffer);

        const form = new FormData();
        form.append("number", finalNumber);
        form.append("caption", caption || "");
        form.append("image", fs.createReadStream(tmpPath));

        const response = await axios.post(`${WA_API_URL}/send-image`, form, {
            headers: { ...form.getHeaders() }
        });

        fs.unlinkSync(tmpPath);
        return { success: true, result: response.data };
    } catch (error) {
        console.error(`WhatsApp Base64 Error (${jid}):`, error.response?.data || error.message);
        return { success: false, error: error.message };
    }
};

/**
 * Send a video with caption
 */
export const sendWhatsAppVideo = async (number, caption, videoUrl) => {
    try {
        const sock = getSock();
        const targetJid = number.includes("@") ? number : `${formatNumber(number)}@s.whatsapp.net`;

        if (sock && sock.user) {
            console.log(`🚀 Sending [VIDEO] to ${targetJid} via Local Bot`);
            try {
                let videoSource;
                if (videoUrl.startsWith("http")) {
                    videoSource = { url: videoUrl };
                } else if (fs.existsSync(videoUrl)) {
                    videoSource = fs.readFileSync(videoUrl);
                } else {
                    throw new Error(`Video file not found: ${videoUrl}`);
                }

                await sock.sendMessage(targetJid, { 
                    video: videoSource,
                    caption: caption || ""
                });
                return { success: true };
            } catch (localErr) {
                console.error(`Local Bot [VIDEO] failed, falling back to API:`, localErr.message);
            }
        }

        const finalNumber = formatNumber(number).split("@")[0];
        console.log(`📡 Sending [VIDEO] to ${finalNumber} via ${WA_API_URL} (Fallback)`);
        
        const form = new FormData();
        form.append("number", finalNumber);
        form.append("caption", caption || "");
        form.append("type", "video");

        if (fs.existsSync(videoUrl)) {
            form.append("file", fs.createReadStream(videoUrl));
        } else {
            throw new Error(`Video file not found: ${videoUrl}`);
        }

        const response = await axios.post(`${WA_API_URL}/send-media`, form, {
            headers: { ...form.getHeaders() }
        });
        
        return { success: true, result: response.data };
    } catch (error) {
        console.error(`WhatsApp Video Error (${number}):`, error.response?.data || error.message);
        return { success: false, error: error.message };
    }
};

/**
 * Send a document
 */
export const sendWhatsAppDoc = async (number, docUrl, fileName) => {
    try {
        const sock = getSock();
        const targetJid = number.includes("@") ? number : `${formatNumber(number)}@s.whatsapp.net`;

        if (sock && sock.user) {
            console.log(`🚀 Sending [DOC] to ${targetJid} via Local Bot`);
            try {
                let docSource;
                if (docUrl.startsWith("http")) {
                    docSource = { url: docUrl };
                } else if (fs.existsSync(docUrl)) {
                    docSource = fs.readFileSync(docUrl);
                } else {
                    throw new Error(`Doc file not found: ${docUrl}`);
                }

                await sock.sendMessage(targetJid, { 
                    document: docSource,
                    fileName: fileName || "document",
                    mimetype: "application/pdf" // default
                });
                return { success: true };
            } catch (localErr) {
                console.error(`Local Bot [DOC] failed, falling back to API:`, localErr.message);
            }
        }

        const finalNumber = formatNumber(number).split("@")[0];
        console.log(`📡 Sending [DOC] to ${finalNumber} via ${WA_API_URL} (Fallback)`);
        
        const form = new FormData();
        form.append("number", finalNumber);
        form.append("type", "document");

        if (fs.existsSync(docUrl)) {
            form.append("file", fs.createReadStream(docUrl));
        } else {
            throw new Error(`Doc file not found: ${docUrl}`);
        }

        const response = await axios.post(`${WA_API_URL}/send-media`, form, {
            headers: { ...form.getHeaders() }
        });
        
        return { success: true, result: response.data };
    } catch (error) {
        console.error(`WhatsApp Doc Error (${number}):`, error.response?.data || error.message);
        return { success: false, error: error.message };
    }
};
