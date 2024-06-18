import axios from "axios";
import config from "../config/config";
import inMemoryJWTService from "../services/inMemoryJWTService.js";

const adminFetch = axios.create({
    baseURL: `${config.API_URL}/admin`,
});

adminFetch.interceptors.request.use((config) => {
    const accessToken = inMemoryJWTService.getToken();
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const handlePsychologistFetchProtected = (data) => {
       return adminFetch.post("/createpsychologist", data)
}
export const handleCreateProcedureFetchProtected = (data) => {
    return adminFetch.post("/createprocedure", data)
}
export const handleUpdatePsychologistFetchProtected = (data) => {
    return adminFetch.post("/updatepsychologist", data)
}
export const handleUpdateProcedureFetchProtected = (data) => {
    return adminFetch.post("/updateprocedure", data)
}
export const handleCreateVoucherPsychologistFetchProtected = (data) => {
    return adminFetch.post("/createvoucher", data)
}
export const handleDeletePsychologistFetchProtected = (data) => {
    return adminFetch.delete("/deletepsychologist/" + data)
}
export const handleDeleteProcedureFetchProtected = (data) => {
    return adminFetch.delete("/deleteprocedure/" + data)
}
export const handleReviewDeleteAdminFetchProtected = (data) => {
    return adminFetch.delete("/deletereview/" + data)
}

