// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/**
 * Composant pour protéger les routes privées
 * Redirige vers /login si l'utilisateur n'est pas authentifié
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div style={loaderStyle}>
        <div style={spinnerStyle}></div>
        <p>Vérification de la session...</p>
      </div>
    );
  }

  // Si non authentifié, rediriger vers login en sauvegardant la destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si authentifié, afficher le contenu
  return children;
};

// Styles inline pour le loader
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

// Ajouter le keyframe dans un style global ou CSS
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default PrivateRoute;