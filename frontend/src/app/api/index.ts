// Export all API services
export { authAPI } from './auth';
export { bookingsAPI } from './bookings';
export { servicesAPI } from './services';
export { API_BASE_URL, API_ENDPOINTS } from './config';
export { default as apiClient } from './client';

// Export types
export type { LoginCredentials, AdminProfile } from './auth';
