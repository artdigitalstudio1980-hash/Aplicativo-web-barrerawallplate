import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'https://barrerawallplate.com/api/v1'; // Update to your dev IP if testing locally (e.g., http://192.168.1.100:3000/api/v1)

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await SecureStore.getItemAsync('refresh_token');
        const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });

        if (res.status === 200) {
          const { accessToken } = res.data;
          await SecureStore.setItemAsync('access_token', accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (e) {
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
      }
    }
    return Promise.reject(error);
  }
);
