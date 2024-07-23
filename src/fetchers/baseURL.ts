import axios from "axios";
import config from "../config";

export const axiosBase = axios.create({
    baseURL: `${config.API_URL}/api/`,
    withCredentials: true,
});