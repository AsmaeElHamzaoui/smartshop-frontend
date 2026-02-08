// src/services/authService.js
import api from './api';

const authService = {
  /**
   * Connexion utilisateur
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<UserDto>}
   */
  login: async (username, password) => {
    try {
      console.log('🔐 Tentative de connexion:', username);
      
      const response = await api.post('/auth/login', {
        username,
        password,
      });
      
      console.log('✅ Connexion réussie:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ Échec de connexion:', error);
      throw error.response?.data || { message: 'Erreur de connexion' };
    }
  },

  /**
   * Déconnexion utilisateur
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
      console.log('✅ Déconnexion réussie');
      return true;
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
      throw error;
    }
  },
};

export default authService;