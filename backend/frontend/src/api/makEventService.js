import API from "./axios";

export const getAllEvents = async () => {
    return await API.get("/mak/events");
};

export const createEvent = async (formData) => {
    return await API.post("/mak/events", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

export const updateEvent = async (id, formData) => {
    return await API.patch(`/mak/events/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

export const deleteEvent = async (id) => {
    return await API.delete(`/mak/events/${id}`);
};
