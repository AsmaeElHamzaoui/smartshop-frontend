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
      console.log(' Tentative de connexion:', username);
      
      const response = await api.post('/auth/login', {
        username,
        password,
      });
      
      console.log(' Connexion réussie:', response.data);
      
      // Vérifier si le cookie a été défini
      const cookies = document.cookie;
      console.log(' Cookies après login:', cookies);
      
      return response.data;
    } catch (error) {
      console.error(' Échec de connexion:', error);
      throw error.response?.data || { message: 'Erreur de connexion' };
    }
  },

  /**
   * Déconnexion utilisateur
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
      console.log(' Déconnexion réussie');
      return true;
    } catch (error) {
      console.error(' Erreur lors de la déconnexion:', error);
      throw error;
    }
  },

  /**
   * Vérifier si l'utilisateur est authentifié
   * NE PAS APPELER AUTOMATIQUEMENT - Seulement quand nécessaire
   */
  checkSession: async () => {
    try {
      console.log(' Vérification de session...');
      const response = await api.get('/api/clients/profile');
      console.log(' Session valide:', response.data);
      return response.data;
    } catch (error) {
      console.log(' Pas de session valide');
      return null;
    }
  },
};

export default authService;