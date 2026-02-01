import axiosInstance from './axiosConfig';
import store from '../../store';
import { forceLogout } from '../../store/slices/authSlice';

// Intercepteur de requête
axiosInstance.interceptors.request.use(
  (config) => {
    // Les cookies de session sont automatiquement envoyés avec withCredentials: true
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // 401 - Non authentifié
      if (status === 401) {
        // Forcer la déconnexion
        store.dispatch(forceLogout());
        
        // Rediriger vers login seulement si pas déjà sur la page login
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }

      // 403 - Accès refusé
      if (status === 403) {
        // Rediriger vers page non autorisée
        if (!window.location.pathname.includes('/unauthorized')) {
          window.location.href = '/unauthorized';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;