import api from "./client.js";

export const getShoes = (gender, params = {}) =>
  api.get(`/shoes/${gender}`, { params });

export const getShoeBySlug = (gender, slug) =>
  api.get(`/shoes/${gender}/slug/${encodeURIComponent(slug)}`);
