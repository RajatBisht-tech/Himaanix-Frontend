import api from "./client.js";

export const getProducts = (params = {}) => api.get("/products", { params });
export const getProductTags = () => api.get("/products/tags");
export const getProductBySlug = (slug) => api.get(`/products/slug/${slug}`);
