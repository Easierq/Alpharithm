import axios from "axios";

// const url = process.env.BASE_URL;
const url = "https://api-freddie.ai-wk.com";

export const apiRequest = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});
