// src/pages/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { login, isAuthenticated, userRole, loading, error } = useAuth();

  // Redirection automatique si déjà authentifié
  useEffect(() => {
    if (isAuthenticated && userRole) {
      redirectBasedOnRole(userRole);
    }
  }, [isAuthenticated, userRole]);

  // Afficher les erreurs du store
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const redirectBasedOnRole = (role) => {
    if (role === 'ADMIN') {
      navigate('/admin/dashboard', { replace: true });
    } else if (role === 'CLIENT') {
      navigate('/client/dashboard', { replace: true });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage(''); // Effacer l'erreur lors de la saisie
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation basique
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    }

    try {
      const result = await login(credentials.username, credentials.password);
      
      if (result.payload && result.payload.role) {
        // Succès - la redirection sera gérée par useEffect
        console.log('Connexion réussie:', result.payload);
      } else if (result.error) {
        setErrorMessage(result.payload || 'Identifiants incorrects');
      }
    } catch (err) {
      setErrorMessage('Une erreur est survenue lors de la connexion');
      console.error('Erreur login:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>SmartShop</h1>
          <p>Gestion commerciale B2B</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Entrez votre nom d'utilisateur"
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              disabled={loading}
            />
          </div>

          {errorMessage && (
            <div className="error-message">
              <span>⚠️ {errorMessage}</span>
            </div>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <div className="login-footer">
          <p>© 2024 MicroTech Maroc - SmartShop</p>
        </div>
      </div>
    </div>
  );
};

export default Login;