import api from './api';

const clientService = {
  /**
   * Récupérer tous les clients (ADMIN)
   * @param {number} page
   * @param {number} size
   */
  getAllClients: async (page = 0, size = 10) => {
    try {
      console.log(`📋 Récupération clients (page ${page}, size ${size})`);
      const response = await api.get('/api/clients', {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération clients:', error);
      throw error.response?.data || { message: 'Erreur récupération clients' };
    }
  },

  /**
   * Récupérer le profil du client connecté
   */
  getProfile: async () => {
    try {
      console.log('👤 Récupération profil client');
      const response = await api.get('/api/clients/profile');
      return response.data;
    } catch (error) {
      console.error('❌ Erreur profil client:', error);
      throw error.response?.data || { message: 'Profil non disponible' };
    }
  },

  /**
   * Récupérer un client par ID
   */
  getClientById: async (id) => {
    try {
      console.log(`🔍 Client ID: ${id}`);
      const response = await api.get(`/api/clients/${id}`);
      return response.data;
    } catch (error) {
      console.error('❌ Client introuvable:', error);
      throw error.response?.data || { message: 'Client introuvable' };
    }
  },

  /**
   * Créer un client
   */
  createClient: async (clientData) => {
    try {
      console.log('➕ Création client');
      const response = await api.post('/api/clients', clientData);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur création client:', error);
      throw error.response?.data || { message: 'Erreur création client' };
    }
  },

  /**
   * Mettre à jour un client
   */
  updateClient: async (id, clientData) => {
    try {
      console.log(`✏️ Mise à jour client ID: ${id}`);
      const response = await api.put(`/api/clients/${id}`, clientData);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur update client:', error);
      throw error.response?.data || { message: 'Erreur mise à jour client' };
    }
  },

  /**
   * Supprimer un client
   */
  deleteClient: async (id) => {
    try {
      console.log(`🗑️ Suppression client ID: ${id}`);
      await api.delete(`/api/clients/${id}`);
      return id;
    } catch (error) {
      console.error('❌ Erreur suppression client:', error);
      throw error.response?.data || { message: 'Erreur suppression client' };
    }
  },

  /**
   * Statistiques personnelles du client connecté
   */
  getPersonalStats: async () => {
    try {
      console.log('📊 Stats client');
      const response = await api.get('/api/clients/statisticsPersonnal');
      return response.data;
    } catch (error) {
      console.error('❌ Erreur stats client:', error);
      throw error.response?.data || { message: 'Stats indisponibles' };
    }
  },
};

export default clientService;
