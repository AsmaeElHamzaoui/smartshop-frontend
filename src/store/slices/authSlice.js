import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// login
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(username, password);
      // Stocker l'utilisateur dans localStorage pour la persistance
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (error) {
      const message = 
        error.response?.data?.message || 
        error.response?.data || 
        'Échec de connexion. Vérifiez vos identifiants.';
      return rejectWithValue(message);
    }
  }
);

//logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      // Supprimer l'utilisateur du localStorage
      localStorage.removeItem('user');
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Échec de déconnexion');
    }
  }
);

// Récupérer l'utilisateur du localStorage au chargement
const userFromStorage = localStorage.getItem('user');
const initialUser = userFromStorage ? JSON.parse(userFromStorage) : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    isAuthenticated: !!initialUser,
    loading: false,
    error: null,
  },
  reducers: {
    // Action pour effacer les erreurs
    clearError: (state) => {
      state.error = null;
    },
    // Action pour restaurer l'utilisateur du localStorage
    restoreUser: (state) => {
      const user = localStorage.getItem('user');
      if (user) {
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },
    // Action pour forcer la déconnexion (en cas d'erreur 401)
    forceLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login - pending
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Login - fulfilled
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      // Login - rejected
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Logout - fulfilled
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      // Logout - rejected
      .addCase(logout.rejected, (state) => {
        // Même en cas d'erreur, on déconnecte localement
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { clearError, restoreUser, forceLogout } = authSlice.actions;
export default authSlice.reducer;