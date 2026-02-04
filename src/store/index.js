// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import clientReducer from './slices/clientSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Ajouter d'autres reducers ici
    // products: productReducer,
    // orders: orderReducer,
     clients: clientReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;