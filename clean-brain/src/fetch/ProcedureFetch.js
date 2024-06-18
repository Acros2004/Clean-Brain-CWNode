import axios from "axios";
import config from "../config/config";
import inMemoryJWTService from "../services/inMemoryJWTService.js";

const procedureClient = axios.create({
    baseURL: `${config.API_URL}/procedure`,
});


export const getAllProceduresFetch = () =>{
    return procedureClient.get("/getAll")
}
export const getProcedureFetch = (data) =>{
    return procedureClient.get("/" + data)
}
