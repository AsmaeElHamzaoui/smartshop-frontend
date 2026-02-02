// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// Instance Axios avec configuration pour les sessions
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // CRUCIAL pour envoyer les cookies de session
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requête
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Intercepteur de réponse
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  (error) => {
    console.error('[API Response Error]', error);
    
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Non authentifié - rediriger vers login
          console.error('Non authentifié - Redirection vers login');
          window.location.href = '/login';
          break;
          
        case 403:
          // Accès refusé
          console.error('Accès refusé:', data.message);
          break;
          
        case 404:
          console.error('Ressource non trouvée');
          break;
          
        case 500:
          console.error('Erreur serveur');
          break;
          
        default:
          console.error(`Erreur ${status}:`, data.message);
      }
    } else if (error.request) {
      console.error('Aucune réponse du serveur');
    } else {
      console.error('Erreur lors de la configuration de la requête');
    }
    
    return Promise.reject(error);
  }
);

export default api;