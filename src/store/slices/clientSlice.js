import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientService from '../../services/clientService';

/* =======================
   THUNKS
======================= */

export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
    try {
      return await clientService.getAllClients(page, size);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchClientById = createAsyncThunk(
  'clients/fetchClientById',
  async (id, { rejectWithValue }) => {
    try {
      return await clientService.getClientById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchClientProfile = createAsyncThunk(
  'clients/fetchClientProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await clientService.getProfile();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchClientStats = createAsyncThunk(
  'clients/fetchClientStats',
  async (_, { rejectWithValue }) => {
    try {
      return await clientService.getPersonalStats();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createClient = createAsyncThunk(
  'clients/createClient',
  async (clientData, { rejectWithValue }) => {
    try {
      return await clientService.createClient(clientData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async ({ id, clientData }, { rejectWithValue }) => {
    try {
      return await clientService.updateClient(id, clientData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (id, { rejectWithValue }) => {
    try {
      return await clientService.deleteClient(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* =======================
   INITIAL STATE
======================= */

const initialState = {
  clients: [],
  currentClient: null,
  profile: null,
  stats: null,
  pagination: {
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  },
  loading: false,
  error: null,
};

/* =======================
   SLICE
======================= */

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clearClientError: (state) => {
      state.error = null;
    },
    clearCurrentClient: (state) => {
      state.currentClient = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH CLIENTS
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload.content || [];
        state.pagination = {
          page: action.payload.number,
          size: action.payload.size,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
        };
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH CLIENT BY ID
      .addCase(fetchClientById.fulfilled, (state, action) => {
        state.currentClient = action.payload;
      })

      // PROFILE
      .addCase(fetchClientProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // STATS
      .addCase(fetchClientStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })

      // CREATE
      .addCase(createClient.fulfilled, (state, action) => {
        state.clients.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateClient.fulfilled, (state, action) => {
        const index = state.clients.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.clients[index] = action.payload;
      })

      // DELETE
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter(c => c.id !== action.payload);
      });
  },
});

/* =======================
   EXPORTS
======================= */

export const {
  clearClientError,
  clearCurrentClient,
} = clientSlice.actions;

export const selectClients = (state) => state.clients.clients;
export const selectClientProfile = (state) => state.clients.profile;
export const selectClientStats = (state) => state.clients.stats;
export const selectClientsPagination = (state) => state.clients.pagination;
export const selectClientsLoading = (state) => state.clients.loading;
export const selectClientsError = (state) => state.clients.error;

export default clientSlice.reducer;
