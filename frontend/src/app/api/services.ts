import apiClient from './client';
import { API_ENDPOINTS } from './config';
import { Service } from '../components/AdminServices';

export const servicesAPI = {
  // Get all services
  getAll: async (): Promise<Service[]> => {
    const { data } = await apiClient.get(API_ENDPOINTS.SERVICES);
    return data;
  },

  // Get service by ID
  getById: async (id: string): Promise<Service> => {
    const { data } = await apiClient.get(API_ENDPOINTS.SERVICES_BY_ID(id));
    return data;
  },

  // Create new service (admin only)
  create: async (service: Omit<Service, 'id'>): Promise<Service> => {
    const { data } = await apiClient.post(API_ENDPOINTS.SERVICES, service);
    return data;
  },

  // Update service (admin only)
  update: async (id: string, service: Partial<Service>): Promise<Service> => {
    const { data } = await apiClient.put(API_ENDPOINTS.SERVICES_BY_ID(id), service);
    return data;
  },

  // Delete service (admin only)
  delete: async (id: string): Promise<{ message: string }> => {
    const { data} = await apiClient.delete(API_ENDPOINTS.SERVICES_BY_ID(id));
    return data;
  },
};
