import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userService = {
  // READ
  getAll: () => apiClient.get("/user"),
  getById: (id) => apiClient.get(`/user/${id}`),

  // CREATE
  create: (data) => apiClient.post("/user", data),

  // UPDATE
  update: (id, data) => apiClient.put(`/user/${id}`, data),

  // DELETE
  delete: (id) => apiClient.delete(`/user/${id}`),
};
