// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, selectAuth, selectUser, selectIsAuthenticated, selectUserRole } from '../store/slices/authSlice';

/**
 * Hook personnalisé pour gérer l'authentification
 */
const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  const handleLogin = async (username, password) => {
    return dispatch(login({ username, password }));
  };

  const handleLogout = async () => {
    return dispatch(logout());
  };

  const isAdmin = () => userRole === 'ADMIN';
  const isClient = () => userRole === 'CLIENT';

  return {
    user,
    isAuthenticated,
    userRole,
    loading: auth.loading,
    error: auth.error,
    login: handleLogin,
    logout: handleLogout,
    isAdmin,
    isClient,
  };
};

export default useAuth;