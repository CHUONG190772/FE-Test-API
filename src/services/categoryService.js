import api from "./api";

export const categoryService = {
  getAllCategories: async () => {
    return await api.get("/categories");
  },

  getCategoryById: async (id) => {
    return await api.get(`/categories/${id}`);
  },

  createCategory: async (data) => {
    return await api.post("/categories", data);
  },

  updateCategory: async (id, data) => {
    return await api.put(`/categories/${id}`, data);
  },

  changeStatus: async (id, active) => {
    return await api.patch(`/categories/${id}/status`, { active });
  },
};
