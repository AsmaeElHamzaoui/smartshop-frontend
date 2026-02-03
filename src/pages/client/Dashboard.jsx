// src/pages/admin/Dashboard.jsx
import React from 'react';
import useAuth from '../../hooks/useAuth';
//import './Dashboard.css';

const ClientDashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // La redirection sera gérée par l'intercepteur
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🏢 Dashboard Administrateur</h1>
          <div className="user-info">
            <span>👤 {user?.username} ({user?.role})</span>
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Bienvenue, {user?.username} !</h2>
          <p>Vous êtes connecté en tant qu'administrateur</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">👥</div>
            <h3>Gestion des Utilisateurs</h3>
            <p>Créer, modifier et supprimer des utilisateurs</p>
            <button className="card-button">Accéder</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🏪</div>
            <h3>Gestion des Clients</h3>
            <p>Gérer les clients et leur fidélité</p>
            <button className="card-button">Accéder</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📦</div>
            <h3>Gestion des Produits</h3>
            <p>CRUD complet sur les produits</p>
            <button className="card-button">Accéder</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🛒</div>
            <h3>Gestion des Commandes</h3>
            <p>Voir et gérer toutes les commandes</p>
            <button className="card-button">Accéder</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">💳</div>
            <h3>Gestion des Paiements</h3>
            <p>Suivre les paiements et statuts</p>
            <button className="card-button">Accéder</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>Statistiques</h3>
            <p>Voir les statistiques globales</p>
            <button className="card-button">Accéder</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;