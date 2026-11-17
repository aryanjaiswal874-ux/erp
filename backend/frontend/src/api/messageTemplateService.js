import API from "./axios";

export const getAllMessageTemplates = async (params) => {
    return await API.get("/message-templates", { params });
};

export const createMessageTemplate = async (templateData) => {
    // If it has file, use FormData
    if (templateData instanceof FormData) {
        return await API.post("/message-templates", templateData);
    }
    return await API.post("/message-templates", templateData);
};

export const updateMessageTemplate = async (id, templateData) => {
    if (templateData instanceof FormData) {
        return await API.put(`/message-templates/${id}`, templateData);
    }
    return await API.put(`/message-templates/${id}`, templateData);
};

export const deleteMessageTemplate = async (id) => {
    return await API.delete(`/message-templates/${id}`);
};
