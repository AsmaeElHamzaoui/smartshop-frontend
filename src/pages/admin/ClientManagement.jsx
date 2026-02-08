// src/components/admin/ClientManagement.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import './ClientManagement.css';
import {
  fetchClients,
  createClient,
  updateClient,
  deleteClient,
  selectClients,
  selectClientsLoading,
  selectClientsError,
} from '../../store/slices/clientSlice';
import { fetchUsers, selectUsers } from '../../store/slices/userSlice';


const ClientManagement = () => {
  const dispatch = useDispatch();

  // --- State Local ---
  const clients = useSelector(selectClients);
  const users = useSelector(selectUsers);
  const loading = useSelector(selectClientsLoading);
  const error = useSelector(selectClientsError);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingClientId, setEditingClientId] = useState(null);
  const [newClient, setNewClient] = useState({
    nom: '',
    email: '',
    userId: '',
    niveauFidelite: 'BASIC',
  });

  // --- Fetch Clients au montage ---
  useEffect(() => {
    dispatch(fetchClients({ page: 0, size: 20 }));
    dispatch(fetchUsers({ page: 0, size: 100 }));
  }, [dispatch]);

  // --- Gestion Formulaire ---
  const handleChange = (e) => {
    setNewClient({
      ...newClient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingClientId) {
      // Modification
      dispatch(updateClient({ id: editingClientId, clientData: newClient }))
        .unwrap()
        .then(() => {
          setShowForm(false);
          setEditingClientId(null);
          setNewClient({ nom: '', email: '', userId: '', niveauFidelite: 'BASIC' });
        })
        .catch((err) => {
          console.error('Erreur mise à jour client:', err);
        });
    } else {
      // Création
      dispatch(createClient(newClient))
        .unwrap()
        .then(() => {
          setShowForm(false);
          setNewClient({ nom: '', email: '', userId: '', niveauFidelite: 'BASIC' });
        })
        .catch((err) => {
          console.error('Erreur création client:', err);
        });
    }
  };


  const handleEdit = (client) => {
    setNewClient({
      nom: client.nom,
      email: client.email,
      userId: client.userId || '',
      niveauFidelite: client.niveauFidelite || 'BASIC',
    });
    setEditingClientId(client.id);
    setShowForm(true);
  };


  // --- Supprimer client ---
  const handleDelete = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce client ?')) {
      dispatch(deleteClient(id));
    }
  };

  // --- Filtrer ---
  const filteredClients = clients.filter(
    (client) =>
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className="client-management">
      <div className="management-header">
        <div>
          <h2>Gestion des Clients</h2>
          <p>Gérez vos clients et leur programme de fidélité</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} />
          {showForm ? 'Annuler' : 'Nouveau Client'}
        </button>
      </div>

      {/* FORMULAIRE CREATION */}
      {showForm && (
        <form className="client-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="nom"
              placeholder="Nom du client"
              value={newClient.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="email@exemple.com"
              value={newClient.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Utilisateur</label>
            <select
              name="userId"
              value={newClient.userId}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionnez un utilisateur --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Niveau de fidélité</label>
            <input type="text" value="BASIC" disabled />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingClientId ? 'Modifier le client' : 'Ajouter le client'}
            </button>

          </div>
        </form>
      )}


      {/* TABLE */}
      <div className="table-container">
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filteredClients.length === 0 ? (
          <div className="empty-state">
            <p>Aucun client trouvé</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Niveau Fidélité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>#{client.id}</td>
                  <td>{client.nom}</td>
                  <td>{client.email}</td>
                  <td>
                    <span className="badge badge-points">{client.niveauFidelite}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit"
                        title="Modifier"
                        onClick={() => handleEdit(client)}
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        className="action-btn delete"
                        title="Supprimer"
                        onClick={() => handleDelete(client.id)}
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
    </div>
  );
};

export default ClientManagement;
