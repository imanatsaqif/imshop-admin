// services/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

export const instagramApi = axios.create({
  baseURL: "https://graph.instagram.com",
  timeout: 10000,
});
