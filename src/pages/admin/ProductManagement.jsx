// src/components/admin/ProductManagement.jsx
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Package,
  DollarSign,
  TrendingUp,
  Filter,
  X
} from 'lucide-react';
import './ProductManagement.css';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prix: '',
    stock: '',
    categorie: '',
    image: ''
  });

  // Données exemples de produits
  const [products, setProducts] = useState([
    { 
      id: 1, 
      nom: 'Smartphone Galaxy S24', 
      description: 'Smartphone haut de gamme',
      prix: 899.99, 
      stock: 45, 
      categorie: 'Électronique',
      image: '📱',
      statut: 'En stock'
    },
    { 
      id: 2, 
      nom: 'MacBook Pro 16"', 
      description: 'Ordinateur portable professionnel',
      prix: 2499.99, 
      stock: 12, 
      categorie: 'Informatique',
      image: '💻',
      statut: 'En stock'
    },
    { 
      id: 3, 
      nom: 'AirPods Pro', 
      description: 'Écouteurs sans fil',
      prix: 279.99, 
      stock: 0, 
      categorie: 'Audio',
      image: '🎧',
      statut: 'Rupture'
    },
    { 
      id: 4, 
      nom: 'Apple Watch Series 9', 
      description: 'Montre connectée',
      prix: 449.99, 
      stock: 8, 
      categorie: 'Wearables',
      image: '⌚',
      statut: 'Stock faible'
    },
    { 
      id: 5, 
      nom: 'iPad Air', 
      description: 'Tablette performante',
      prix: 699.99, 
      stock: 28, 
      categorie: 'Tablettes',
      image: '📱',
      statut: 'En stock'
    },
  ]);

  const categories = ['all', 'Électronique', 'Informatique', 'Audio', 'Wearables', 'Tablettes'];

  // Filtrage des produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Statistiques
  const stats = {
    total: products.length,
    enStock: products.filter(p => p.stock > 0).length,
    rupture: products.filter(p => p.stock === 0).length,
    valeurStock: products.reduce((acc, p) => acc + (p.prix * p.stock), 0)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'ajout de produit
    console.log('Nouveau produit:', formData);
    setShowModal(false);
    setFormData({ nom: '', description: '', prix: '', stock: '', categorie: '', image: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="product-management">
      {/* En-tête avec statistiques */}
      <div className="product-header">
        <div>
          <h2>Gestion des Produits</h2>
          <p>Gérez votre catalogue de produits</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} />
          Nouveau Produit
        </button>
      </div>

      {/* Cartes de statistiques */}
      <div className="product-stats">
        <div className="stat-card-product">
          <div className="stat-icon-product purple">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Produits</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
        </div>

        <div className="stat-card-product">
          <div className="stat-icon-product green">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">En Stock</p>
            <h3 className="stat-value">{stats.enStock}</h3>
          </div>
        </div>

        <div className="stat-card-product">
          <div className="stat-icon-product red">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">En Rupture</p>
            <h3 className="stat-value">{stats.rupture}</h3>
          </div>
        </div>

        <div className="stat-card-product">
          <div className="stat-icon-product blue">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Valeur Stock</p>
            <h3 className="stat-value">{stats.valeurStock.toFixed(2)} DH</h3>
          </div>
        </div>
      </div>

      {/* Barre d'outils */}
      <div className="product-toolbar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-section">
          <Filter size={18} />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            <option value="all">Toutes les catégories</option>
            {categories.slice(1).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="toolbar-actions">
          <button className="btn-secondary">Exporter</button>
          <button className="btn-secondary">Importer</button>
        </div>
      </div>

      {/* Tableau des produits */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Produit</th>
              <th>Description</th>
              <th>Catégorie</th>
              <th>Prix (DH)</th>
              <th>Stock</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-image">{product.image}</div>
                </td>
                <td>
                  <div className="product-name">{product.nom}</div>
                </td>
                <td>
                  <div className="product-description">{product.description}</div>
                </td>
                <td>
                  <span className="badge badge-category">{product.categorie}</span>
                </td>
                <td>
                  <strong>{product.prix.toFixed(2)} DH</strong>
                </td>
                <td>
                  <span className={`stock-badge ${product.stock === 0 ? 'empty' : product.stock < 10 ? 'low' : 'good'}`}>
                    {product.stock} unités
                  </span>
                </td>
                <td>
                  <span className={`badge badge-status ${product.statut === 'En stock' ? 'success' : product.statut === 'Rupture' ? 'danger' : 'warning'}`}>
                    {product.statut}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" title="Voir">
                      <Eye size={16} />
                    </button>
                    <button className="action-btn edit" title="Modifier">
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="action-btn delete" 
                      title="Supprimer"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <Package size={48} />
          <p>Aucun produit trouvé</p>
        </div>
      )}

      {/* Modal d'ajout de produit */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Ajouter un Nouveau Produit</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label>Nom du produit *</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  placeholder="Ex: iPhone 15 Pro"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Description détaillée du produit"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Prix (DH) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.prix}
                    onChange={(e) => setFormData({...formData, prix: e.target.value})}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Catégorie *</label>
                <select
                  value={formData.categorie}
                  onChange={(e) => setFormData({...formData, categorie: e.target.value})}
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>URL Image</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="https://..."
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Ajouter le Produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;