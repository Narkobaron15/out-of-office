import axios from "axios";
import APP_ENV from "./env.ts";

const http_common = axios.create({
    baseURL: APP_ENV.BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

export default http_common
