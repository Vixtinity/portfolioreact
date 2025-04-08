import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Importar imagen y PDF correctamente
import fotoMia from '../assets/images/fotomia.png';
import curriculumPDF from '../assets/images/curriculum.pdf';

const Home: React.FC = () => {
  return (
    <div className="bg-purple-100 min-h-screen">
      {/* Header */}
      <header className="bg-purple-900 text-white py-4"> {/* Color morado */}
        <div className="container mx-auto px-4">
          <Header titulo="¿Quién soy?" />
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="container mx-auto py-10 px-4 md:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div id="asideimagen" className="text-center md:w-1/2">
              <img
                src={fotoMia}
                alt="Foto propia"
                loading="lazy"
                className="rounded-full max-w-[250px] mx-auto"
              />
            </div>
            <div id="descripcion" className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                <strong>Ismael Fernández López</strong>
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Desarrollador web apasionado por la tecnología.
              </p>
              <a
                href={curriculumPDF}
                download="curriculum.pdf"
                id="botondescargarcurriculum"
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
              >
                Descargar currículum
              </a>
            </div>
          </div>

          <div id="empresas" className="mt-10 text-center">
            <h3 className="text-2xl font-semibold text-gray-800">Trabajé en:</h3>
            <button
              id="prysboton"
              className="mt-4 bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition"
              onClick={() => window.open('http://www.prys.es/', '_blank')}
            >
              Empresa Ejemplo
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-6"> {/* Color morado */}
        <div className="container mx-auto px-4">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Home;
