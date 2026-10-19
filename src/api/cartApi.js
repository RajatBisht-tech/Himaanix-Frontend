import api from "./client.js";

export const getCart = () => api.get("/cart");
export const addCartItem = (data) => api.post("/cart", data);
export const updateCartItem = (id, data) => api.patch(`/cart/${id}`, data);
export const removeCartItem = (id) => api.delete(`/cart/${id}`);
