import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Importar imágenes
import cowboy1 from '../assets/images/proyecto2.jpg';
import cowboy2 from '../assets/images/proyecto2-2.jpg';
import cowboy3 from '../assets/images/proyecto2-3.jpg';

const Proyecto: React.FC = () => {
  const imagenes = [cowboy1, cowboy2, cowboy3];

  return (
    <div className="bg-gray-100 min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className=" text-white">
        <div className="container mx-auto px-4">
          <Header titulo="Proyectos" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg max-w-xl w-full">
          {/* Carrusel */}
          <div className="relative w-full overflow-hidden rounded-t-lg">
            <div className="flex transition-transform duration-500 ease-in-out">
              {imagenes.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Proyecto imagen ${idx + 1}`}
                  className="w-full object-cover"
                />
              ))}
            </div>
          </div>

          {/* Info del proyecto */}
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Cowboy Game</h2>
            <p className="text-gray-600 mb-4">
              Juego web desarrollado con Phaser y TypeScript, donde controlas un vaquero que debe sobrevivir en el viejo oeste.
            </p>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Ir al proyecto
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Proyecto;
