import axios from "axios";

const API = axios.create({
  baseURL: "https://bellcorp-eventhub-mahi.onrender.com/api",
  withCredentials: true,
});



export default API;
