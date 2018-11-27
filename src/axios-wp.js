import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://dev.bluekrill.com/demoWP/wp-json"
});

export default axiosInstance;