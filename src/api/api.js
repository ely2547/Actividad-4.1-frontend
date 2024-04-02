import axios from "axios";

const API = "http://localhost:3000/api";

const instance = axios.create({
    baseURL: API,
    withCredentials: true
});

export const registerRequest = user => instance.post(`/register`, user);
export const loginRequest = user => instance.post(`/login`, user);
export const verityTokenRequet = () => instance.get("/verify");

export default instance;



