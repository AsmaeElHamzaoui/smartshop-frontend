import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, selectAuthInitialized } from './store/slices/authSlice';
import AppRouter from './routes/AppRouter';
import './styles/global.css';

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector(selectAuthInitialized);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Affiche un loader tant que l'auth n'est pas initialisée
  if (!initialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        Chargement...
      </div>
    );
  }

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
