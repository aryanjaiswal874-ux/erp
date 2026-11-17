import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const WA_BASE_URL = process.env.WHATSAPP_API_URL || 'https://whatsappmak.manavadhikarkendra.org';

/**
 * Send a text message via WhatsApp
 * @param {string} number - Phone number with country code (e.g., 917004778923)
 * @param {string} message - Message text
 */
export const sendWhatsAppText = async (number, message) => {
    try {
        const cleanNumber = number.replace(/\D/g, '');
        const response = await axios.post(`${WA_BASE_URL}/send`, {
            number: cleanNumber,
            message: message
        }, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('WhatsApp Text Send Error:', error.response?.data || error.message);
        return { success: false, error: error.message };
    }
};

/**
 * Send an image via WhatsApp
 * @param {string} number - Phone number with country code
 * @param {string} caption - Image caption
 * @param {string} imagePath - Absolute path to the image file
 */
export const sendWhatsAppImage = async (number, caption, imagePath) => {
    try {
        const cleanNumber = number.replace(/\D/g, '');
        const form = new FormData();
        form.append('number', cleanNumber);
        form.append('caption', caption);
        form.append('image', fs.createReadStream(imagePath));

        const response = await axios.post(`${WA_BASE_URL}/send-image`, form, {
            headers: {
                ...form.getHeaders(),
                'accept': '*/*'
            }
        });
        return response.data;
    } catch (error) {
        console.error('WhatsApp Image Send Error:', error.response?.data || error.message);
        return { success: false, error: error.message };
    }
};
