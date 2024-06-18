import axios from "axios";
import config from "../config/config";

const academicDegreeClient = axios.create({
    baseURL: `${config.API_URL}/academicdegree`,
});
const specializationClient = axios.create({
    baseURL: `${config.API_URL}/specialization`,
});
const reviewsClient = axios.create({
    baseURL: `${config.API_URL}/review`,
});

export const getAllReviewFetch = () =>{
    return reviewsClient.get("/getAll")
}

export const getAllSpecializationFetch = () =>{
    return specializationClient.get("/getAll")
}

export const getAllAcademicDegreeFetch = () =>{
    return academicDegreeClient.get("/getAll")
}

