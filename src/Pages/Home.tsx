import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Importar imagen y PDF correctamente
import fotoMia from '../assets/images/fotomia.png';
import curriculumPDF from '../assets/images/curriculum.pdf';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Header */}
      <header className="">
        <div className="container mx-auto px-1">
          <Header titulo="¿Quién soy?" />
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="container mx-auto py-50 px-4 md:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div id="asideimagen" className="text-center md:w-1/2">
              <img
                src={fotoMia}
                alt="Foto propia"
                loading="lazy"
                className="rounded-full max-w-[400px] mx-auto"
              />
            </div>
            <div id="descripcion" className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-3">
                <strong>Ismael Fernández López</strong>
              </h2>
              <p className="text-lg text-white mb-4">
                Desarrollador web apasionado por la tecnología.
              </p>
              <a
                href={curriculumPDF}
                download="curriculum.pdf"
                id="botondescargarcurriculum"
                className="bg-pink-300 text-gray-800 py-2 px-6 rounded-md hover:bg-pink-400 transition"
              >
                Descargar currículum
              </a>
            </div>
          </div>

          <div id="empresas" className="mt-10 text-center">
            <h3 className="text-2xl font-semibold text-gray-800">Trabajé en:</h3>
            <button
              id="prysboton"
              className="mt-4 bg-yellow-200 text-gray-800 py-2 px-6 rounded-md hover:bg-yellow-300 transition"
              onClick={() => window.open('http://www.prys.es/', '_blank')}
            >
              Empresa Ejemplo
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900 text-gray-800 py-0"> {/* Morado pastel */}
        <div className="container mx-auto px-4">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Home;
