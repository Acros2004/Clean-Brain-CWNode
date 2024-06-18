import axios from "axios";
import config from "../config/config";
import inMemoryJWTService from "../services/inMemoryJWTService.js";

const Client = axios.create({
    baseURL: `${config.API_URL}/client`,
});

Client.interceptors.request.use((config) => {
    const accessToken = inMemoryJWTService.getToken();
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export const handleProfileFetchProtected = (data) => {
       return Client.post("/update", {Name_Client: data.profileName, Surname_Client: data.profileSurname,Photo_Client: data.profilePhoto})
}
export const handleBookingFetchProtected = (data) => {
    return Client.post("/booking", data)
}
export const getAllBookingsFetchProtected = () => {
    return Client.get("/booking")
}

export const handleDeleteBookingFetchProtected = (data) => {
    return Client.delete("/booking/" + data)
}

export const handleReviewFetchProtected = (data) => {
    return Client.post("/review", data)
}

export const handleReviewDeleteFetchProtected = (data) => {
    return Client.delete("/deletereview/" + data)
}