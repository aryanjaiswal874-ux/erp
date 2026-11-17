import dotenv from 'dotenv';

dotenv.config();

let cachedToken = null;
let tokenExpiry = null;

const SMARTFLO_BASE_URL = "https://api-smartflo.tatateleservices.com/v1";

/**
 * Log in to Smartflo to get a fresh token.
 */
const loginSmartflo = async () => {
    try {
        const payload = {
            email: process.env.SMARTFLO_USER,
            password: process.env.SMARTFLO_PASS
        };

        console.log("🔄 Logging in to Smartflo...", { email: payload.email });

        const response = await fetch(`${SMARTFLO_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok || !data.access_token) {
            throw new Error(data.message || "Failed to login to Smartflo");
        }

        cachedToken = data.access_token;
        // Set expiry time (data.expires_in is in seconds, usually 3600)
        // Set slightly less than actual expiry to be safe (e.g., -60 seconds)
        const expirySeconds = data.expires_in ? (data.expires_in - 60) : 3500;
        tokenExpiry = Date.now() + (expirySeconds * 1000);

        console.log("✅ Smartflo Login Successful. Token cached.");

        return cachedToken;
    } catch (error) {
        console.error("❌ Smartflo Login Error:", error.message);
        throw error;
    }
};

/**
 * Get a valid Smartflo token.
 * Returns cached token if valid, otherwise logs in again.
 */
export const getSmartfloToken = async () => {
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
        return cachedToken;
    }
    return await loginSmartflo();
};

/**
 * Initiate a Click-to-Call request.
 * @param {string} agentNumber - The agent's Smartflo ID.
 * @param {string} destinationNumber - The customer's phone number.
 */
export const initiateCall = async (agentNumber, destinationNumber, callerId) => {
    try {
        const token = await getSmartfloToken();

        if (!callerId) {
            throw new Error("Caller ID is required. Please check your account configuration.");
        }

        if (!agentNumber) {
            throw new Error("Agent number (Smartflo ID) is required.");
        }
        if (!destinationNumber) {
            throw new Error("Destination number is required.");
        }

        // Tata Smartflo Public API expects the SIP Extension/DID (e.g., 0507398650001) 
        // If the user inputs their short login User ID (e.g., 739865), we auto-format it.
        let formattedAgentNumber = agentNumber;
        if (formattedAgentNumber.length === 6) {
            formattedAgentNumber = `050${formattedAgentNumber}0001`;
        }

        const payload = {
            agent_number: formattedAgentNumber,
            destination_number: destinationNumber,
            caller_id: callerId,
            async: 1,
            call_timeout: 120
        };

        console.log("📞 Initiating Smartflo Call...", payload);

        const response = await fetch(`${SMARTFLO_BASE_URL}/click_to_call`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to initiate call");
        }

        return data;
    } catch (error) {
        console.error("❌ Smartflo Call Error:", error.message);
        throw error;
    }
};
