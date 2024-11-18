import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5001/yr-challenge/us-central1/api", // THE API (clous function)
});

export default instance;
