import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const API = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: "application/json"
    }
});

export const getProducts = () => API.get("/products");
export const deleteProduct = id => API.delete(`/products/${id}`);
export const storeProduct = data =>
    API.post("/products", data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
export const updateProduct = (id, data) => {
    data.append("_method", "PUT");
    return API.post(`/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};
