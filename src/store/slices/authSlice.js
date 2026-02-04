// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// --- Actions asynchrones ---

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const userData = await authService.login(username, password);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur de connexion');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return true;
    } catch (error) {
      return rejectWithValue(error.message || 'Erreur de déconnexion');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { getState, rejectWithValue }) => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'));
    if (!userFromStorage) {
      return rejectWithValue('Pas de session');
    }

    try {
      // Vérification côté serveur optionnelle
      const userData = await authService.checkSession();
      if (!userData) {
        // Si le serveur ne renvoie rien, on ne réinitialise pas Redux
        console.warn('Session serveur expirée, mais localStorage contient encore l’utilisateur');
        return userFromStorage; // garde l’utilisateur
      }
      return userData;
    } catch (error) {
      console.warn('Erreur checkSession, utilisation de localStorage');
      return userFromStorage;
    }
  }
);


// --- État initial avec persistance ---
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  loading: false,
  error: null,
  initialized: false,
};

// --- Slice ---
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    resetAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.initialized = false;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        state.initialized = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        state.initialized = true;
      })

      // LOGOUT
      .addCase(logout.pending, (state) => { state.loading = true; })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.initialized = false;
        localStorage.removeItem('user');
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CHECK AUTH
      .addCase(checkAuth.pending, (state) => { state.loading = true; })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.initialized = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.initialized = true;
        localStorage.removeItem('user');
      });
  },
});

export const { clearError, resetAuth } = authSlice.actions;

// --- Sélecteurs ---
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.user?.role;
export const selectAuthInitialized = (state) => state.auth.initialized;

export default authSlice.reducer;
