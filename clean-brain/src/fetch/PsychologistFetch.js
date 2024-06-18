import axios from "axios";
import config from "../config/config";
import inMemoryJWTService from "../services/inMemoryJWTService.js";

const psychologistClient = axios.create({
    baseURL: `${config.API_URL}/psychologist`,
});


export const getAllPsychologistsFetch = () =>{
    return psychologistClient.get("/getAll")
}

export const getPsychologistsFetch = (data) =>{
    return psychologistClient.get("/" + data)
}
