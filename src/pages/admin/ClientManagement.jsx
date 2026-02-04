// src/components/admin/ClientManagement.jsx
import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import './ClientManagement.css';

const ClientManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Données exemples
  const clients = [
    { id: 1, nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@email.com', telephone: '0612345678', pointsFidelite: 120 },
    { id: 2, nom: 'Martin', prenom: 'Marie', email: 'marie.martin@email.com', telephone: '0623456789', pointsFidelite: 85 },
    { id: 3, nom: 'Bernard', prenom: 'Pierre', email: 'pierre.bernard@email.com', telephone: '0634567890', pointsFidelite: 200 },
    { id: 4, nom: 'Dubois', prenom: 'Sophie', email: 'sophie.dubois@email.com', telephone: '0645678901', pointsFidelite: 45 },
  ];

  const filteredClients = clients.filter(client =>
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
        <button className="btn-primary">
          <Plus size={20} />
          Nouveau Client
        </button>
      </div>

      <div className="management-toolbar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="toolbar-actions">
          <button className="btn-secondary">Exporter</button>
          <button className="btn-secondary">Filtrer</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Points Fidélité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td>#{client.id}</td>
                <td>{client.nom}</td>
                <td>{client.prenom}</td>
                <td>{client.email}</td>
                <td>{client.telephone}</td>
                <td>
                  <span className="badge badge-points">{client.pointsFidelite} pts</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" title="Voir">
                      <Eye size={16} />
                    </button>
                    <button className="action-btn edit" title="Modifier">
                      <Edit2 size={16} />
                    </button>
                    <button className="action-btn delete" title="Supprimer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredClients.length === 0 && (
        <div className="empty-state">
          <p>Aucun client trouvé</p>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;