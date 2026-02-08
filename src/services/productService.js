import api from './api';

const productService = {

  /**
   * Récupérer tous les produits (ADMIN)
   * @param {number} page
   * @param {number} size
   */
  getAllProducts: async (page = 0, size = 10) => {
    try {
      console.log(`📋 Récupération produits (page ${page}, size ${size})`);
      const response = await api.get('/api/products', {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération produits:', error);
      throw error.response?.data || { message: 'Erreur récupération produits' };
    }
  },

  /**
   * Récupérer un produit par ID
   */
  getProductById: async (id) => {
    try {
      console.log(`🔍 Produit ID: ${id}`);
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('❌ Produit introuvable:', error);
      throw error.response?.data || { message: 'Produit introuvable' };
    }
  },

  /**
   * Créer un produit
   */
  createProduct: async (productData) => {
    try {
      console.log('➕ Création produit');
      const response = await api.post('/api/products', productData);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur création produit:', error);
      throw error.response?.data || { message: 'Erreur création produit' };
    }
  },

  /**
   * Mettre à jour un produit
   */
  updateProduct: async (id, productData) => {
    try {
      console.log(`✏️ Mise à jour produit ID: ${id}`);
      const response = await api.put(`/api/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur update produit:', error);
      throw error.response?.data || { message: 'Erreur mise à jour produit' };
    }
  },

  /**
   * Supprimer un produit
   */
  deleteProduct: async (id) => {
    try {
      console.log(`🗑️ Suppression produit ID: ${id}`);
      await api.delete(`/api/products/${id}`);
      return id;
    } catch (error) {
      console.error('❌ Erreur suppression produit:', error);
      throw error.response?.data || { message: 'Erreur suppression produit' };
    }
  },
};

export default productService;
