// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserRole } from '../store/slices/authSlice';

// Composants de protection
import PrivateRoute from './PrivateRoute';
import RoleBasedRoute from './RoleBasedRoute';

// Pages d'authentification
import Login from '../pages/auth/Login';

// Pages Admin
import AdminDashboard from '../pages/admin/Dashboard';

// Pages Client
import ClientDashboard from '../pages/client/Dashboard';

/**
 * Composant pour gérer la redirection depuis la page d'accueil
 * selon le rôle de l'utilisateur
 */
const HomeRedirect = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === 'ADMIN') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (userRole === 'CLIENT') {
    return <Navigate to="/client/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

/**
 * Configuration du router principal
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route d'accueil - redirige selon l'authentification */}
        <Route path="/" element={<HomeRedirect />} />

        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />

        {/* Routes ADMIN - Accessibles uniquement par les ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <RoleBasedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />

        {/* Routes CLIENT - Accessibles uniquement par les CLIENT */}
        <Route
          path="/client/dashboard"
          element={
            <PrivateRoute>
              <RoleBasedRoute allowedRoles={['CLIENT']}>
                <ClientDashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />

        {/* Route 404 - Page non trouvée */}
        <Route
          path="*"
          element={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              fontFamily: 'system-ui',
            }}>
              <h1>404 - Page non trouvée</h1>
              <p>La page que vous recherchez n'existe pas.</p>
              <button
                onClick={() => window.history.back()}
                style={{
                  marginTop: '20px',
                  padding: '12px 24px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Retour
              </button>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;