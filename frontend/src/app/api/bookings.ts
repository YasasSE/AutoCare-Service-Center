import apiClient from './client';
import { API_ENDPOINTS } from './config';
import { BookingData } from '../components/BookingForm';

export const bookingsAPI = {
  // Get all bookings
  getAll: async (): Promise<BookingData[]> => {
    const { data } = await apiClient.get(API_ENDPOINTS.BOOKINGS);
    return data;
  },

  // Get booking by ID
  getById: async (id: string): Promise<BookingData> => {
    const { data } = await apiClient.get(API_ENDPOINTS.BOOKINGS_BY_ID(id));
    return data;
  },

  // Get bookings by customer email
  getByEmail: async (email: string): Promise<BookingData[]> => {
    const { data } = await apiClient.get(API_ENDPOINTS.BOOKINGS_BY_EMAIL(email));
    return data;
  },

  // Create new booking
  create: async (booking: Omit<BookingData, 'id' | 'status'>): Promise<BookingData> => {
    const { data } = await apiClient.post(API_ENDPOINTS.BOOKINGS, booking);
    return data;
  },

  // Update booking status (admin only)
  updateStatus: async (
    id: string,
    status: 'Pending' | 'Approved' | 'Completed' | 'Rejected'
  ): Promise<BookingData> => {
    const { data } = await apiClient.put(API_ENDPOINTS.BOOKINGS_STATUS(id), { status });
    return data;
  },

  // Delete booking (admin only)
  delete: async (id: string): Promise<{ message: string }> => {
    const { data } = await apiClient.delete(API_ENDPOINTS.BOOKINGS_BY_ID(id));
    return data;
  },
};
