import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    users: 245,
    clients: 1832,
    products: 567,
    orders: 3421,
    revenue: 125678,
    pendingOrders: 23
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const cards = [
    {
      id: 1,
      title: 'Gestion des Utilisateurs',
      description: 'Créer, modifier et supprimer des utilisateurs',
      icon: '👥',
      color: '#667eea',
      stat: stats.users,
      label: 'utilisateurs'
    },
    {
      id: 2,
      title: 'Gestion des Clients',
      description: 'Gérer les clients et leur fidélité',
      icon: '🏪',
      color: '#f093fb',
      stat: stats.clients,
      label: 'clients actifs'
    },
    {
      id: 3,
      title: 'Gestion des Produits',
      description: 'CRUD complet sur les produits',
      icon: '📦',
      color: '#4facfe',
      stat: stats.products,
      label: 'produits'
    },
    {
      id: 4,
      title: 'Gestion des Commandes',
      description: 'Voir et gérer toutes les commandes',
      icon: '🛒',
      color: '#43e97b',
      stat: stats.orders,
      label: 'commandes'
    },
    {
      id: 5,
      title: 'Gestion des Paiements',
      description: 'Suivre les paiements et statuts',
      icon: '💳',
      color: '#fa709a',
      stat: `${stats.revenue.toLocaleString()}€`,
      label: 'revenus'
    },
    {
      id: 6,
      title: 'Statistiques',
      description: 'Voir les statistiques globales',
      icon: '📊',
      color: '#feca57',
      stat: stats.pendingOrders,
      label: 'en attente'
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>⚡</div>
              <span style={styles.logoText}>AdminPro</span>
            </div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.userInfo}>
              <div style={styles.userAvatar}>
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div style={styles.userDetails}>
                <div style={styles.userName}>{user?.username}</div>
                <div style={styles.userRole}>{user?.role}</div>
              </div>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              <span>Déconnexion</span>
              <span style={styles.logoutIcon}>→</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Welcome Banner */}
        <div style={styles.welcomeBanner}>
          <div style={styles.welcomeContent}>
            <h1 style={styles.welcomeTitle}>
              Bienvenue, {user?.username} 👋
            </h1>
            <p style={styles.welcomeSubtitle}>
              Voici un aperçu de votre tableau de bord administrateur
            </p>
          </div>
          <div style={styles.welcomeDecoration}></div>
        </div>

        {/* Stats Overview */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📈</div>
            <div style={styles.statInfo}>
              <div style={styles.statValue}>+12.5%</div>
              <div style={styles.statLabel}>Croissance</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⭐</div>
            <div style={styles.statInfo}>
              <div style={styles.statValue}>4.8/5</div>
              <div style={styles.statLabel}>Satisfaction</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🎯</div>
            <div style={styles.statInfo}>
              <div style={styles.statValue}>89%</div>
              <div style={styles.statLabel}>Objectif</div>
            </div>
          </div>
        </div>

        {/* Main Cards Grid */}
        <div style={styles.cardsGrid}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              style={{
                ...styles.card,
                animationDelay: `${index * 0.1}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.querySelector('.card-glow').style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.querySelector('.card-glow').style.opacity = '0';
              }}
            >
              <div
                className="card-glow"
                style={{
                  ...styles.cardGlow,
                  background: `radial-gradient(circle at 50% 0%, ${card.color}40, transparent 70%)`
                }}
              ></div>
              
              <div style={styles.cardHeader}>
                <div style={{
                  ...styles.cardIcon,
                  background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)`
                }}>
                  {card.icon}
                </div>
                <div style={styles.cardBadge}>
                  <div style={styles.cardStat}>{card.stat}</div>
                  <div style={styles.cardLabel}>{card.label}</div>
                </div>
              </div>

              <h3 style={styles.cardTitle}>{card.title}</h3>
              <p style={styles.cardDescription}>{card.description}</p>

              <button style={{
                ...styles.cardButton,
                background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)`
              }}>
                <span>Accéder</span>
                <span style={styles.buttonArrow}>→</span>
              </button>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Sora', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)',
    position: 'relative',
    overflow: 'hidden',
  },

  header: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '1.25rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },

  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  logoIcon: {
    fontSize: '1.75rem',
    animation: 'float 3s ease-in-out infinite',
  },

  logoText: {
    fontSize: '1.5rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.02em',
  },

  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem 1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },

  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#fff',
  },

  userDetails: {
    display: 'flex',
    flexDirection: 'column',
  },

  userName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#fff',
  },

  userRole: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontFamily: 'JetBrains Mono, monospace',
  },

  logoutBtn: {
    padding: '0.625rem 1.25rem',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '10px',
    color: '#ef4444',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    fontFamily: 'Sora, sans-serif',
  },

  logoutIcon: {
    fontSize: '1rem',
    transition: 'transform 0.3s ease',
  },

  main: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2.5rem 2rem',
  },

  welcomeBanner: {
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))',
    borderRadius: '24px',
    padding: '2.5rem',
    marginBottom: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'fadeInUp 0.6s ease-out',
  },

  welcomeContent: {
    position: 'relative',
    zIndex: 1,
  },

  welcomeTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
  },

  welcomeSubtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400',
  },

  welcomeDecoration: {
    position: 'absolute',
    top: '-50%',
    right: '-10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.25rem',
    marginBottom: '2.5rem',
  },

  statCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    transition: 'all 0.3s ease',
    animation: 'fadeInUp 0.6s ease-out',
  },

  statIcon: {
    fontSize: '2rem',
  },

  statInfo: {
    display: 'flex',
    flexDirection: 'column',
  },

  statValue: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'JetBrains Mono, monospace',
  },

  statLabel: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
  },

  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  },

  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    animation: 'fadeInUp 0.6s ease-out backwards',
  },

  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '200px',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  },

  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
  },

  cardIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.75rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },

  cardBadge: {
    textAlign: 'right',
  },

  cardStat: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'JetBrains Mono, monospace',
  },

  cardLabel: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginTop: '0.25rem',
  },

  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '0.75rem',
    letterSpacing: '-0.01em',
  },

  cardDescription: {
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  },

  cardButton: {
    width: '100%',
    padding: '0.875rem',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    fontFamily: 'Sora, sans-serif',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },

  buttonArrow: {
    fontSize: '1.1rem',
    transition: 'transform 0.3s ease',
  },
};

export default AdminDashboard;