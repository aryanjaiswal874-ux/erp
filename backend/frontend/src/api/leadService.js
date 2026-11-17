import API from "./axios";

export const createLead = async (leadData) => {
    return await API.post("/leads", leadData);
};

export const getAllLeads = async (params) => {
    return await API.get("/leads", { params });
};

export const getLeadById = async (id) => {
    return await API.get(`/leads/${id}`);
};

export const updateLead = async (id, data) => {
    return await API.put(`/leads/${id}`, data);
};

export const addFollowUp = async (leadId, formData) => {
    return await API.post(`/leads/${leadId}/followup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

// ... existing code
export const getDailyReport = async (date) => {
    return await API.get("/leads/reports", { params: { date } });
};

export const importLeads = async (leads) => {
    return await API.post("/leads/bulk", { leads });
};

export const initiateCall = async (leadId, phoneNumber) => {
    return await API.post("/smartflo/call", { lead_id: leadId, destination_number: phoneNumber });
};

export const getSmartfloToken = async () => {
    return await API.get("/smartflo/token");
};

export const bulkAssignLeads = async (leadIds, userId) => {
    return await API.post("/leads/bulk-assign", { leadIds, userId });
};
