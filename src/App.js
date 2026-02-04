import React from 'react';
import AppRouter from './routes/AppRouter';
import './styles/global.css';

function App() {
  // ✅ Plus besoin de checkAuth ni de loader
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;