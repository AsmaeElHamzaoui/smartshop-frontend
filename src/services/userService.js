// src/services/userService.js
import api from './api';

const userService = {
  /**
   * Créer un nouvel utilisateur
   * @param {Object} userData - { username, password, role }
   * @returns {Promise<UserDto>}
   */
  createUser: async (userData) => {
    try {
      console.log('➕ Création utilisateur:', userData.username);
      const response = await api.post('/api/users', userData);
      console.log('✅ Utilisateur créé:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur création utilisateur:', error);
      throw error.response?.data || { message: 'Erreur lors de la création' };
    }
  },

  /**
   * Récupérer tous les utilisateurs (paginé)
   * @param {number} page - Numéro de page (défaut: 0)
   * @param {number} size - Taille de page (défaut: 10)
   * @returns {Promise<Page<UserDto>>}
   */
  getAllUsers: async (page = 0, size = 10) => {
    try {
      console.log(`📋 Récupération des utilisateurs (page ${page}, size ${size})`);
      const response = await api.get('/api/users', {
        params: { page, size }
      });
      console.log('✅ Utilisateurs récupérés:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération utilisateurs:', error);
      throw error.response?.data || { message: 'Erreur lors de la récupération' };
    }
  },

  /**
   * Récupérer un utilisateur par ID
   * @param {number} id - ID de l'utilisateur
   * @returns {Promise<UserDto>}
   */
  getUserById: async (id) => {
    try {
      console.log(`🔍 Récupération utilisateur ID: ${id}`);
      const response = await api.get(`/api/users/${id}`);
      console.log('✅ Utilisateur trouvé:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération utilisateur:', error);
      throw error.response?.data || { message: 'Utilisateur non trouvé' };
    }
  },

  /**
   * Mettre à jour un utilisateur
   * @param {number} id - ID de l'utilisateur
   * @param {Object} userData - { username, password?, role }
   * @returns {Promise<UserDto>}
   */
  updateUser: async (id, userData) => {
    try {
      console.log(`✏️ Mise à jour utilisateur ID: ${id}`);
      const response = await api.put(`/api/users/${id}`, userData);
      console.log('✅ Utilisateur mis à jour:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur mise à jour utilisateur:', error);
      throw error.response?.data || { message: 'Erreur lors de la mise à jour' };
    }
  },

  /**
   * Supprimer un utilisateur
   * @param {number} id - ID de l'utilisateur
   * @returns {Promise<void>}
   */
  deleteUser: async (id) => {
    try {
      console.log(`🗑️ Suppression utilisateur ID: ${id}`);
      await api.delete(`/api/users/${id}`);
      console.log('✅ Utilisateur supprimé');
      return true;
    } catch (error) {
      console.error('❌ Erreur suppression utilisateur:', error);
      throw error.response?.data || { message: 'Erreur lors de la suppression' };
    }
  },
};

export default userService;