import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchOrders,
  fetchOrderById,
  confirmOrder,
  cancelOrder,
  deleteOrder,
  clearCurrentOrder,
  selectOrders,
  selectCurrentOrder,
  selectOrdersLoading,
} from '../../store/slices/orderSlice';

import {
  fetchClients,
  selectClients,
} from '../../store/slices/clientSlice';

import {
  Eye,
  ShoppingCart,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package,
  Calendar,
  Trash2,
} from 'lucide-react';

import './OrderManagement.css';

const OrderManagement = () => {
  const dispatch = useDispatch();

  /* =======================
     REDUX STATE
  ======================= */
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const selectedOrder = useSelector(selectCurrentOrder);
  const clients = useSelector(selectClients);

  const [searchTerm, setSearchTerm] = useState('');

  /* =======================
     LOAD DATA
  ======================= */
  useEffect(() => {
    dispatch(fetchOrders({ page: 0, size: 50 }));
    dispatch(fetchClients({ page: 0, size: 1000 }));
  }, [dispatch]);

  /* =======================
     HELPERS
  ======================= */

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? `${client.nom} ${client.prenom}` : 'Client inconnu';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'EN_PREPARATION': return <Clock size={16} />;
      case 'CONFIRMEE': return <Package size={16} />;
      case 'EN_LIVRAISON': return <Truck size={16} />;
      case 'LIVREE': return <CheckCircle size={16} />;
      case 'ANNULEE': return <XCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'EN_PREPARATION': return 'info';
      case 'CONFIRMEE': return 'warning';
      case 'EN_LIVRAISON': return 'primary';
      case 'LIVREE': return 'success';
      case 'ANNULEE': return 'danger';
      default: return 'info';
    }
  };

  /* =======================
     HANDLERS
  ======================= */

  const handleViewDetails = (id) => {
    dispatch(fetchOrderById(id));
  };

  const handleConfirm = (id) => {
    dispatch(confirmOrder(id));
  };

  const handleCancel = (id) => {
    dispatch(cancelOrder(id));
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer définitivement cette commande ?')) {
      dispatch(deleteOrder(id));
      dispatch(clearCurrentOrder());
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toString().includes(searchTerm)
  );

  /* =======================
     RENDER
  ======================= */

  return (
    <div className="order-management">

      {/* HEADER */}
      <div className="order-header">
        <div>
          <h2>Gestion des Commandes</h2>
          <p>Suivi et gestion des commandes</p>
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Date</th>
                <th>Total</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>CMD-{order.id}</td>
                  <td>{getClientName(order.clientId)}</td>
                  <td>
                    <Calendar size={14} />{' '}
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td>
                    <strong>{order.total.toFixed(2)} DH</strong>
                  </td>
                  <td>
                    <span className={`badge badge-status ${getStatusClass(order.statut)}`}>
                      {getStatusIcon(order.statut)}
                      {order.statut}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {order.statut !== 'LIVREE' && (
                        <button
                          className="action-btn delete"
                          title="Supprimer"
                          onClick={() => handleDelete(order.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EMPTY */}
      {orders.length === 0 && !loading && (
        <div className="empty-state">
          <ShoppingCart size={48} />
          <p>Aucune commande</p>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
