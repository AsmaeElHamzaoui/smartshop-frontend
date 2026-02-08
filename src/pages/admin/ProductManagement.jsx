// src/pages/admin/ProductManagement.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  selectProducts,
  selectProductsLoading,
} from '../../store/slices/productSlice';

import {
  Plus,
  Edit2,
  Trash2,
  Package,
  X
} from 'lucide-react';

import './ProductManagement.css';

const ProductManagement = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);

  const [showModal, setShowModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [formData, setFormData] = useState({
    nom: '',
    prixUnitaire: '',
    stockDisponible: '',
  });

  /* =======================
     LOAD PRODUCTS
  ======================= */
  useEffect(() => {
    dispatch(fetchProducts({ page: 0, size: 50 }));
  }, [dispatch]);

  /* =======================
     HANDLERS
  ======================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProductId) {
      dispatch(updateProduct({
        id: editingProductId,
        productData: formData,
      }));
    } else {
      dispatch(createProduct(formData));
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setFormData({
      nom: product.nom,
      prixUnitaire: product.prixUnitaire,
      stockDisponible: product.stockDisponible,
    });
    setEditingProductId(product.id);
    setShowModal(true);
  };

 const handleDelete = async (id) => {
  try {
    await dispatch(deleteProduct(id)).unwrap();
  } catch (error) {
    alert("Impossible de supprimer : produit utilisé dans une commande");
  }
};


  const resetForm = () => {
    setShowModal(false);
    setEditingProductId(null);
    setFormData({ nom: '', prixUnitaire: '', stockDisponible: '' });
  };


  /* =======================
     RENDER
  ======================= */

  return (
    <div className="product-management">

      {/* HEADER */}
      <div className="product-header">
        <div>
          <h2>Gestion des Produits</h2>
          <p>Catalogue des produits</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> Nouveau Produit
        </button>
      </div>

      {/* TABLE */}
      <div className="table-container">
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix (DH)</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.nom}</td>
                  <td><strong>{product.prixUnitaire.toFixed(2)}</strong></td>
                  <td>{product.stockDisponible}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="action-btn delete"
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
        )}
      </div>

      {products.length === 0 && !loading && (
        <div className="empty-state">
          <Package size={48} />
          <p>Aucun produit</p>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {editingProductId ? 'Modifier le produit' : 'Ajouter un produit'}
              </h3>
              <button className="modal-close" onClick={resetForm}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label>Nom *</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Prix (DH) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.prixUnitaire}
                    onChange={(e) =>
                      setFormData({ ...formData, prixUnitaire: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    type="number"
                    value={formData.stockDisponible}
                    onChange={(e) =>
                      setFormData({ ...formData, stockDisponible: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  {editingProductId ? 'Modifier' : 'Ajouter'}
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
