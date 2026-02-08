import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../../services/orderService';

/* =======================
   THUNKS
======================= */

// CRUD commandes
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
    try {
      return await orderService.getAllOrders(page, size);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPersonalOrders = createAsyncThunk(
  'orders/fetchPersonalOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.getPersonalOrders();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id, { rejectWithValue }) => {
    try {
      return await orderService.getOrderById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      return await orderService.createOrder(orderData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const confirmOrder = createAsyncThunk(
  'orders/confirmOrder',
  async (id, { rejectWithValue }) => {
    try {
      return await orderService.confirmOrder(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (id, { rejectWithValue }) => {
    try {
      return await orderService.cancelOrder(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      return await orderService.deleteOrder(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* =======================
   INITIAL STATE
======================= */

const initialState = {
  orders: [],
  personalOrders: [],
  currentOrder: null,
  pagination: { page: 0, size: 10, totalPages: 0, totalElements: 0 },
  loading: false,
  error: null,
};

/* =======================
   SLICE
======================= */

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderError: (state) => { state.error = null; },
    clearCurrentOrder: (state) => { state.currentOrder = null; },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ORDERS
      .addCase(fetchOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.content || [];
        state.pagination = {
          page: action.payload.number,
          size: action.payload.size,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
        };
      })
      .addCase(fetchOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // FETCH PERSONAL ORDERS
      .addCase(fetchPersonalOrders.fulfilled, (state, action) => {
        state.personalOrders = action.payload || [];
      })

      // FETCH ORDER BY ID
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })

      // CREATE ORDER
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      })

      // CONFIRM ORDER
      .addCase(confirmOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o.id === action.payload.id);
        if (index !== -1) state.orders[index] = action.payload;
      })

      // CANCEL ORDER
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o.id === action.payload.id);
        if (index !== -1) state.orders[index] = action.payload;
      })

      // DELETE ORDER
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(o => o.id !== action.payload);
      });
  },
});

/* =======================
   EXPORTS
======================= */
export const { clearOrderError, clearCurrentOrder } = orderSlice.actions;

export const selectOrders = (state) => state.orders.orders;
export const selectPersonalOrders = (state) => state.orders.personalOrders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrdersPagination = (state) => state.orders.pagination;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;

export default orderSlice.reducer;
