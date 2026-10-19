import api from "./client.js";

export const getMyOrders = (params = {}) => api.get("/orders/my-orders", { params });
export const getOrderTracking = (id) => api.get(`/orders/${id}/tracking`);
export const createOrder = (data) => api.post("/orders", data);
