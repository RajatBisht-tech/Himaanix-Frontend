import api from "./client.js";

export const getWatches = (gender, params = {}) =>
  api.get(`/watches/${gender}`, { params });

export const getWatchBySlug = (gender, slug) =>
  api.get(`/watches/${gender}/slug/${encodeURIComponent(slug)}`);
