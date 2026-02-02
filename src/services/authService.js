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
      const response = await api.post('/auth/login', {
        username,
        password,
      });
      
      // Le backend retourne UserDto et crée une session avec cookie
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur de connexion' };
    }
  },

  /**
   * Déconnexion utilisateur
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
      return true;
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  },

  /**
   * Vérifier si l'utilisateur est authentifié
   * On peut appeler un endpoint protégé pour vérifier la session
   */
  checkSession: async () => {
    try {
      // Appeler un endpoint protégé pour vérifier la session
      // Par exemple, récupérer le profil
      const response = await api.get('/api/clients/profile');
      return response.data;
    } catch (error) {
      return null;
    }
  },
};

export default authService;