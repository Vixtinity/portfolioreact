// src/App.tsx
import React from 'react';
import Home from './Pages/Home'; // Asegúrate de importar el componente correcto

const App: React.FC = () => {
  return (
    <div>
      <Home /> {/* Aquí renderizamos el componente de la página */}
    </div>
  );
};

export default App;
