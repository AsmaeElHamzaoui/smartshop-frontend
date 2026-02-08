import api from './api';

const orderService = {

  // Récupérer toutes les commandes (ADMIN)
  getAllOrders: async (page = 0, size = 10) => {
    try {
      console.log(`📋 Récupération commandes (page ${page}, size ${size})`);
      const response = await api.get('/commandes', { params: { page, size } });
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération commandes:', error);
      throw error.response?.data || { message: 'Erreur récupération commandes' };
    }
  },

  // Récupérer commandes personnelles
  getPersonalOrders: async () => {
    try {
      console.log('👤 Récupération commandes personnelles');
      const response = await api.get('/commandes/personnal');
      return response.data;
    } catch (error) {
      console.error('❌ Erreur commandes personnelles:', error);
      throw error.response?.data || { message: 'Erreur récupération commandes personnelles' };
    }
  },

  // Récupérer une commande par ID
  getOrderById: async (id) => {
    try {
      console.log(`🔍 Commande ID: ${id}`);
      const response = await api.get(`/commandes/${id}`);
      return response.data;
    } catch (error) {
      console.error('❌ Commande introuvable:', error);
      throw error.response?.data || { message: 'Commande introuvable' };
    }
  },

  // Créer une commande
  createOrder: async (orderData) => {
    try {
      console.log('➕ Création commande');
      const response = await api.post('/commandes', orderData);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur création commande:', error);
      throw error.response?.data || { message: 'Erreur création commande' };
    }
  },

  // Confirmer une commande
  confirmOrder: async (id) => {
    try {
      console.log(`✅ Confirmation commande ID: ${id}`);
      const response = await api.put(`/commandes/${id}/confirmer`);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur confirmation commande:', error);
      throw error.response?.data || { message: 'Impossible de confirmer la commande' };
    }
  },

  // Annuler une commande
  cancelOrder: async (id) => {
    try {
      console.log(`❌ Annulation commande ID: ${id}`);
      const response = await api.put(`/commandes/${id}/annuler`);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur annulation commande:', error);
      throw error.response?.data || { message: 'Impossible d’annuler la commande' };
    }
  },

  // Supprimer une commande
  deleteOrder: async (id) => {
    try {
      console.log(`🗑️ Suppression commande ID: ${id}`);
      await api.delete(`/commandes/${id}`);
      return id;
    } catch (error) {
      console.error('❌ Erreur suppression commande:', error);
      throw error.response?.data || { message: 'Impossible de supprimer la commande' };
    }
  },
};

export default orderService;
