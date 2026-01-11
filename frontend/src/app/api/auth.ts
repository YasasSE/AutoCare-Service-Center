import apiClient from './client';
import { API_ENDPOINTS } from './config';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AdminProfile {
  _id: string;
  username: string;
  role: string;
  token: string;
}

export const authAPI = {
  // Login admin
  login: async (credentials: LoginCredentials): Promise<AdminProfile> => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH_LOGIN, credentials);
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('isAdmin', 'true');
    }
    return data;
  },

  // Register admin (for initial setup)
  register: async (credentials: LoginCredentials): Promise<AdminProfile> => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH_REGISTER, credentials);
    if (data.token) {
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('isAdmin', 'true');
    }
    return data;
  },

  // Get admin profile
  getProfile: async (): Promise<Omit<AdminProfile, 'token'>> => {
    const { data } = await apiClient.get(API_ENDPOINTS.AUTH_PROFILE);
    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
  },
};
