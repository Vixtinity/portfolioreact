import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Proyecto: React.FC = () => {
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

      <main className="flex-grow flex items-center justify-center">
        <div className="bg-black shadow-lg rounded-lg max-w-xl w-full">
          <div className="relative w-full overflow-hidden rounded-t-lg aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/S6QB4-9-hlg"
              title="Proyecto librería"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Proyecto librería hecho en React</h2>
            <p className="text-white mb-4">
              Pequeño proyecto de React conectado con MariaDB.
            </p>
            <a
              href="https://youtu.be/S6QB4-9-hlg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-900 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded transition"
            >
              Ver en YouTube
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
