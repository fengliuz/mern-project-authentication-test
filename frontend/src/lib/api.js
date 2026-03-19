import axios from "axios"
const api = axios.create({
    baseURL:import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
    withCredentials:true,
    headers:{
        Accept: 'application/json'
    }
})
api.interceptors.request.use((config) => {
    const warehouseId = localStorage.getItem("activeWarehouseId");
    if (warehouseId && warehouseId !== "undefined" && warehouseId !== "null") {
        config.headers["x-warehouse-id"] = warehouseId;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});
export default api