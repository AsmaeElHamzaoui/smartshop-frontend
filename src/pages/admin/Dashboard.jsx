// src/pages/admin/Dashboard.jsx
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { 
  Users, 
  Store, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  BarChart3, 
  Menu, 
  X,
  LogOut,
  Home
} from 'lucide-react';
import './Dashboard.css';

// Import des composants de gestion (à créer séparément)
 import ClientManagement from './ClientManagement';
 import ProductManagement from './ProductManagement';
 import OrderManagement from './OrderManagement';


const DashboardHome = ({ user }) => (
  <div className="dashboard-home">
    <div className="welcome-section">
      <h2>Bienvenue, {user?.username} !</h2>
      <p className="welcome-subtitle">Vous êtes connecté en tant qu'administrateur</p>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon blue">
          <Users size={24} />
        </div>
        <div className="stat-info">
          <h3>1,234</h3>
          <p>Clients</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon green">
          <Package size={24} />
        </div>
        <div className="stat-info">
          <h3>567</h3>
          <p>Produits</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon orange">
          <ShoppingCart size={24} />
        </div>
        <div className="stat-info">
          <h3>89</h3>
          <p>Commandes</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon purple">
          <CreditCard size={24} />
        </div>
        <div className="stat-info">
          <h3>12,345 DH</h3>
          <p>Revenus</p>
        </div>
      </div>
    </div>

    <div className="quick-actions">
      <h3>Actions rapides</h3>
      <div className="action-cards">
        <div className="action-card">
          <Package size={20} />
          <span>Ajouter un produit</span>
        </div>
        <div className="action-card">
          <Users size={20} />
          <span>Nouveau client</span>
        </div>
        <div className="action-card">
          <ShoppingCart size={20} />
          <span>Voir les commandes</span>
        </div>
        <div className="action-card">
          <BarChart3 size={20} />
          <span>Voir les stats</span>
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'home', label: 'Accueil', icon: Home, component: DashboardHome },
    { id: 'clients', label: 'Clients', icon: Store, component: ClientManagement },
    { id: 'products', label: 'Produits', icon: Package, component: ProductManagement },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart, component: OrderManagement },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const ActiveComponent = menuItems.find(item => item.id === activeSection)?.component || DashboardHome;

  return (
    <div className="dashboard-layout">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <button 
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="navbar-title">🏢 Admin Dashboard</h1>
          </div>
          
          <div className="navbar-right">
            <div className="user-info">
              <div className="user-avatar">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <span className="user-name">{user?.username}</span>
                <span className="user-role">{user?.role}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <nav className="sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-wrapper">
            <ActiveComponent user={user} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;