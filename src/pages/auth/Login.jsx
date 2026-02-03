// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();

  // Rediriger si déjà authentifié
  React.useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = userRole === 'ADMIN' ? '/admin/dashboard' : '/client/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await login(username, password);
      console.log('✅ Login réussi:', result);
      
      // La redirection se fera automatiquement via useEffect ci-dessus
    } catch (err) {
      console.error('❌ Erreur login:', err);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Connexion</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Nom d'utilisateur</label>
            <input
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Mot de passe</label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          
          {error && (
            <div style={errorStyle}>
              ⚠️ {error}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...buttonStyle,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f7fafc',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
};

const titleStyle = {
  margin: '0 0 30px 0',
  fontSize: '28px',
  fontWeight: '600',
  color: '#2d3748',
  textAlign: 'center',
};

const inputGroupStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#4a5568',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s',
};

const buttonStyle = {
  width: '100%',
  padding: '14px',
  fontSize: '16px',
  fontWeight: '600',
  backgroundColor: '#667eea',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  transition: 'all 0.3s',
};

const errorStyle = {
  padding: '12px',
  marginBottom: '20px',
  backgroundColor: '#fed7d7',
  color: '#c53030',
  borderRadius: '8px',
  fontSize: '14px',
};

export default Login;