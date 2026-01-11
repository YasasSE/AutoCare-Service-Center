// API Configuration
export const API_BASE_URL = 'http://localhost:5000/api';

// For production, use environment variable:
// export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_PROFILE: '/auth/profile',
  
  // Bookings
  BOOKINGS: '/bookings',
  BOOKINGS_BY_ID: (id: string) => `/bookings/${id}`,
  BOOKINGS_STATUS: (id: string) => `/bookings/${id}/status`,
  BOOKINGS_BY_EMAIL: (email: string) => `/bookings/customer/${email}`,
  
  // Services
  SERVICES: '/services',
  SERVICES_BY_ID: (id: string) => `/services/${id}`,
};
