import axiosInstance from './api/interceptors';

const authService = {
  // Login
  login: async (username, password) => {
    const response = await axiosInstance.post('/auth/login', {
      username,
      password,
    });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },

  // Vérifier la session (optionnel)
  checkSession: async () => {
    try {
      const response = await axiosInstance.get('/api/clients/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;