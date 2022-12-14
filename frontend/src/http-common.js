import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:9090/api",
    headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json"
    }
});