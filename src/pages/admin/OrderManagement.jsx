// src/components/admin/OrderManagement.jsx
import React, { useState } from 'react';
import { 
  Search, 
  Eye, 
  Package,
  ShoppingCart,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Filter,
  Download,
  Calendar
} from 'lucide-react';
import './OrderManagement.css';

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Données exemples de commandes
  const [orders, setOrders] = useState([
    {
      id: 'CMD-001',
      client: 'Jean Dupont',
      date: '2024-02-04 14:30',
      total: 1299.99,
      statut: 'En cours',
      paiement: 'Payé',
      items: 3,
      produits: [
        { nom: 'Smartphone Galaxy S24', quantite: 1, prix: 899.99 },
        { nom: 'AirPods Pro', quantite: 1, prix: 279.99 },
        { nom: 'Câble USB-C', quantite: 2, prix: 59.99 }
      ],
      adresse: '123 Rue de Paris, Casablanca'
    },
    {
      id: 'CMD-002',
      client: 'Marie Martin',
      date: '2024-02-04 11:15',
      total: 2499.99,
      statut: 'Livré',
      paiement: 'Payé',
      items: 1,
      produits: [
        { nom: 'MacBook Pro 16"', quantite: 1, prix: 2499.99 }
      ],
      adresse: '456 Avenue Mohammed V, Rabat'
    },
    {
      id: 'CMD-003',
      client: 'Pierre Bernard',
      date: '2024-02-03 16:45',
      total: 449.99,
      statut: 'En préparation',
      paiement: 'Payé',
      items: 1,
      produits: [
        { nom: 'Apple Watch Series 9', quantite: 1, prix: 449.99 }
      ],
      adresse: '789 Boulevard Hassan II, Marrakech'
    },
    {
      id: 'CMD-004',
      client: 'Sophie Dubois',
      date: '2024-02-03 09:20',
      total: 1399.98,
      statut: 'Annulé',
      paiement: 'Remboursé',
      items: 2,
      produits: [
        { nom: 'iPad Air', quantite: 2, prix: 699.99 }
      ],
      adresse: '321 Rue des Fleurs, Fès'
    },
    {
      id: 'CMD-005',
      client: 'Ahmed El Mansouri',
      date: '2024-02-02 13:00',
      total: 559.98,
      statut: 'En livraison',
      paiement: 'Payé',
      items: 2,
      produits: [
        { nom: 'AirPods Pro', quantite: 2, prix: 279.99 }
      ],
      adresse: '555 Avenue des FAR, Tanger'
    }
  ]);

  const statuses = [
    { value: 'all', label: 'Tous les statuts', count: orders.length },
    { value: 'En préparation', label: 'En préparation', count: orders.filter(o => o.statut === 'En préparation').length },
    { value: 'En cours', label: 'En cours', count: orders.filter(o => o.statut === 'En cours').length },
    { value: 'En livraison', label: 'En livraison', count: orders.filter(o => o.statut === 'En livraison').length },
    { value: 'Livré', label: 'Livré', count: orders.filter(o => o.statut === 'Livré').length },
    { value: 'Annulé', label: 'Annulé', count: orders.filter(o => o.statut === 'Annulé').length }
  ];

  // Filtrage des commandes
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.statut === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Statistiques
  const stats = {
    total: orders.length,
    enCours: orders.filter(o => o.statut === 'En cours' || o.statut === 'En préparation').length,
    livrees: orders.filter(o => o.statut === 'Livré').length,
    revenus: orders.filter(o => o.paiement === 'Payé').reduce((acc, o) => acc + o.total, 0)
  };

  const getStatusIcon = (statut) => {
    switch(statut) {
      case 'En préparation': return <Clock size={16} />;
      case 'En cours': return <Package size={16} />;
      case 'En livraison': return <Truck size={16} />;
      case 'Livré': return <CheckCircle size={16} />;
      case 'Annulé': return <XCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  const getStatusClass = (statut) => {
    switch(statut) {
      case 'En préparation': return 'info';
      case 'En cours': return 'warning';
      case 'En livraison': return 'primary';
      case 'Livré': return 'success';
      case 'Annulé': return 'danger';
      default: return 'info';
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, statut: newStatus } : order
    ));
  };

  return (
    <div className="order-management">
      {/* En-tête */}
      <div className="order-header">
        <div>
          <h2>Gestion des Commandes</h2>
          <p>Suivez et gérez toutes vos commandes</p>
        </div>
        <button className="btn-primary">
          <Download size={20} />
          Exporter
        </button>
      </div>

      {/* Cartes de statistiques */}
      <div className="order-stats">
        <div className="stat-card-order">
          <div className="stat-icon-order blue">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Commandes</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
        </div>

        <div className="stat-card-order">
          <div className="stat-icon-order orange">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">En Cours</p>
            <h3 className="stat-value">{stats.enCours}</h3>
          </div>
        </div>

        <div className="stat-card-order">
          <div className="stat-icon-order green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Livrées</p>
            <h3 className="stat-value">{stats.livrees}</h3>
          </div>
        </div>

        <div className="stat-card-order">
          <div className="stat-icon-order purple">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Revenus</p>
            <h3 className="stat-value">{stats.revenus.toFixed(2)} DH</h3>
          </div>
        </div>
      </div>

      {/* Filtres de statut */}
      <div className="status-filters">
        {statuses.map(status => (
          <button
            key={status.value}
            className={`status-filter-btn ${selectedStatus === status.value ? 'active' : ''}`}
            onClick={() => setSelectedStatus(status.value)}
          >
            <span>{status.label}</span>
            <span className="filter-count">{status.count}</span>
          </button>
        ))}
      </div>

      {/* Barre de recherche */}
      <div className="order-toolbar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Rechercher par n° de commande ou client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-secondary">
          <Filter size={18} />
          Filtres avancés
        </button>
      </div>

      {/* Tableau des commandes */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>N° Commande</th>
              <th>Client</th>
              <th>Date</th>
              <th>Articles</th>
              <th>Total</th>
              <th>Paiement</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  <span className="order-id">{order.id}</span>
                </td>
                <td>
                  <strong>{order.client}</strong>
                </td>
                <td>
                  <div className="order-date">
                    <Calendar size={14} />
                    {order.date}
                  </div>
                </td>
                <td>
                  <span className="items-count">{order.items} article{order.items > 1 ? 's' : ''}</span>
                </td>
                <td>
                  <strong className="order-total">{order.total.toFixed(2)} DH</strong>
                </td>
                <td>
                  <span className={`badge badge-payment ${order.paiement === 'Payé' ? 'paid' : 'refunded'}`}>
                    {order.paiement}
                  </span>
                </td>
                <td>
                  <span className={`badge badge-status ${getStatusClass(order.statut)}`}>
                    {getStatusIcon(order.statut)}
                    {order.statut}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn view" 
                      title="Voir détails"
                      onClick={() => handleViewDetails(order)}
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="empty-state">
          <ShoppingCart size={48} />
          <p>Aucune commande trouvée</p>
        </div>
      )}

      {/* Modal détails commande */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content order-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>Détails de la commande</h3>
                <p className="order-id-detail">{selectedOrder.id}</p>
              </div>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                ✕
              </button>
            </div>

            <div className="order-details-content">
              {/* Informations client */}
              <div className="detail-section">
                <h4>Informations Client</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Nom :</span>
                    <span className="detail-value">{selectedOrder.client}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Date :</span>
                    <span className="detail-value">{selectedOrder.date}</span>
                  </div>
                  <div className="detail-item full-width">
                    <span className="detail-label">Adresse de livraison :</span>
                    <span className="detail-value">{selectedOrder.adresse}</span>
                  </div>
                </div>
              </div>

              {/* Produits */}
              <div className="detail-section">
                <h4>Produits commandés</h4>
                <div className="products-list">
                  {selectedOrder.produits.map((produit, index) => (
                    <div key={index} className="product-item">
                      <div className="product-info">
                        <span className="product-name">{produit.nom}</span>
                        <span className="product-quantity">x {produit.quantite}</span>
                      </div>
                      <span className="product-price">{(produit.prix * produit.quantite).toFixed(2)} DH</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Récapitulatif */}
              <div className="detail-section">
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Total</span>
                    <strong className="total-amount">{selectedOrder.total.toFixed(2)} DH</strong>
                  </div>
                  <div className="summary-row">
                    <span>Statut</span>
                    <span className={`badge badge-status ${getStatusClass(selectedOrder.statut)}`}>
                      {getStatusIcon(selectedOrder.statut)}
                      {selectedOrder.statut}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span>Paiement</span>
                    <span className={`badge badge-payment ${selectedOrder.paiement === 'Payé' ? 'paid' : 'refunded'}`}>
                      {selectedOrder.paiement}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="detail-section">
                <h4>Changer le statut</h4>
                <div className="status-actions">
                  {['En préparation', 'En cours', 'En livraison', 'Livré'].map(status => (
                    <button
                      key={status}
                      className={`status-btn ${selectedOrder.statut === status ? 'active' : ''}`}
                      onClick={() => handleUpdateStatus(selectedOrder.id, status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;