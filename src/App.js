// src/App.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './store/slices/authSlice';
import AppRouter from './routes/AppRouter';
import './styles/global.css';

function App() {
  const dispatch = useDispatch();

  // Vérifier la session au chargement de l'application
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;