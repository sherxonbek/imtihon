import axios from 'axios';

//barcha bazaga aloqadroqlar sho`tta qisqacha tarif togrisi zb ekan funk nom qoyish uzb en aralash

const API_URL = "https://69ea232415c7e2d512695ff1.mockapi.io";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const productAPI = {
  getAll: async () => {
    const response = await api.get('/Prodacts');
    return response.data;
  },

  create: async (productData) => {
    const response = await api.post('/Prodacts', productData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/Prodacts/${id}`);
    return response.data;
  }
};

export const bannerAPI = {
    getAll: async () => {
    const response = await api.get('/banners');
    return response.data;
  },

  create: async (bannerData) => {
    const response = await api.post('/banners', bannerData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/banners/${id}`);
    return response.data;
  }
}
