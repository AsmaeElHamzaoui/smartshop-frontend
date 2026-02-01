import { useAppSelector, useAppDispatch } from '../store/hooks';
import { login, logout, clearError } from '../store/slices/authSlice';
import { ROLES } from '../utils/constants';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  // Fonction de connexion
  const handleLogin = async (username, password) => {
    const result = await dispatch(login({ username, password }));
    return result;
  };

  // Fonction de déconnexion
  const handleLogout = async () => {
    await dispatch(logout());
  };

  // Effacer les erreurs
  const handleClearError = () => {
    dispatch(clearError());
  };

  // Vérifier si l'utilisateur est admin
  const isAdmin = () => {
    return user?.role === ROLES.ADMIN;
  };

  // Vérifier si l'utilisateur est client
  const isClient = () => {
    return user?.role === ROLES.CLIENT;
  };

  // Vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (role) => {
    return user?.role === role;
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    handleLogin,
    handleLogout,
    handleClearError,
    isAdmin,
    isClient,
    hasRole,
  };
};