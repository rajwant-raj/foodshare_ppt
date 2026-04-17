import axios from "axios";

const API = "http://127.0.0.1:8000";

export const registerUser = (data) => axios.post(`${API}/register`, data);
export const loginUser = (data) => axios.post(`${API}/login`, data);
export const getDonations = () => axios.get(`${API}/donations`);
export const donateFood = (data) => axios.post(`${API}/donate`, data);
export const updateStatus = (id) => axios.post(`${API}/update/${id}`);