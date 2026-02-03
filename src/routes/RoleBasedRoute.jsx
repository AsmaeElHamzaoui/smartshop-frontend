// src/routes/RoleBasedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/**
 * Composant pour protéger les routes selon le rôle
 * 
 * @param {Array<string>} allowedRoles - Rôles autorisés (ex: ['ADMIN'])
 * @param {ReactNode} children - Contenu à afficher si autorisé
 */
const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { userRole, isAuthenticated } = useAuth();

  // Si non authentifié, rediriger vers login (normalement géré par PrivateRoute)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier si le rôle de l'utilisateur est autorisé
  const hasAccess = allowedRoles.includes(userRole);

  if (!hasAccess) {
    // Rediriger selon le rôle
    const redirectPath = userRole === 'ADMIN' ? '/admin/dashboard' : '/client/dashboard';
    
    return (
      <div style={errorStyle}>
        <h1> Accès refusé</h1>
        <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
        <button 
          onClick={() => window.location.href = redirectPath} 
          style={buttonStyle}
        >
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  // Si autorisé, afficher le contenu
  return children;
};

// Styles inline pour la page d'erreur
const errorStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  textAlign: 'center',
  padding: '20px',
};

const buttonStyle = {
  marginTop: '20px',
  padding: '12px 24px',
  backgroundColor: '#667eea',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

export default RoleBasedRoute;