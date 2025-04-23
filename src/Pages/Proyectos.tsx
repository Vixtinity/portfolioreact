import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Importar imágenes
import cowboy1 from '../assets/images/proyecto2.jpg';
import cowboy2 from '../assets/images/proyecto2-2.jpg';
import cowboy3 from '../assets/images/proyecto2-3.jpg';

const Proyecto: React.FC = () => {
  const imagenes = [cowboy1, cowboy2, cowboy3];
  const [indice, setIndice] = useState(0);

  // Carrusel automático
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  // Ir arriba suavemente
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-white">
        <div className="container mx-auto px-4">
          <Header titulo="Proyectos" />
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-black shadow-lg rounded-lg max-w-xl w-full">
          {/* Carrusel */}
          <div className="relative w-full overflow-hidden rounded-t-lg h-64">
            {imagenes.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Proyecto imagen ${idx + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  idx === indice ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            ))}
          </div>

          {/* Info del proyecto */}
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Página de Cowboy Bebop</h2>
            <p className="text-white mb-4">
              Página de Cowboy Bebop hecha en Google Sites
            </p>
            <a
              href="https://sites.google.com/view/bebopsmr1/inicio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-900 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded transition"
            >
              Ir al proyecto
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-custom text-white py-6 relative">
        <div className="container mx-auto px-4">
          <Footer />
        </div>

        {/* Botón volver arriba */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-purple-900 hover:bg-purple-800 text-white p-3 rounded-full transition"
          aria-label="Volver arriba"
        >
          ↑
        </button>
      </footer>
    </div>
  );
};

export default Proyecto;
