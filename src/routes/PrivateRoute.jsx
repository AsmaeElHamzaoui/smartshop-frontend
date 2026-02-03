// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/**
 * PrivateRoute - Protège les routes nécessitant une authentification
 * ⚠️ Ne vérifie PAS la session automatiquement pour éviter les boucles
 * Se base uniquement sur l'état Redux
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Afficher un loader pendant le chargement initial (login en cours)
  if (loading) {
    return (
      <div style={loaderStyle}>
        <div style={spinnerStyle}></div>
        <p>Vérification...</p>
      </div>
    );
  }

  // Si non authentifié, rediriger vers login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si authentifié, afficher le contenu
  return children;
};

const loaderStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const spinnerStyle = {
  width: '48px',
  height: '48px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #667eea',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

// Ajouter l'animation CSS (si nécessaire, ajouter dans votre fichier CSS global)
const styleSheet = document.styleSheets[0];
try {
  styleSheet.insertRule(`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `, styleSheet.cssRules.length);
} catch (e) {
  // Animation déjà définie ou erreur
}

export default PrivateRoute;