import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Importar imagen y PDF correctamente
import fotoMia from '../assets/images/fotomia.png';
import curriculumPDF from '../assets/images/curriculum.pdf';

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Manejar el clic en el botón "volver arriba"
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  // Funcionalidad del botón "PRYS"
  const handleHoverPrys = () => {
    const mapaContainer = document.getElementById('mapa-container');
    if (mapaContainer) {
      mapaContainer.style.maxHeight = '200px'; // Expandimos el contenedor
    }
  };

  const handleMouseOutPrys = () => {
    const mapaContainer = document.getElementById('mapa-container');
    if (mapaContainer) {
      mapaContainer.style.maxHeight = '0px'; // Restablecemos el contenedor
    }
  };

  // Toggle del menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Cleanup para evitar fugas de memoria al desmontar el componente
    return () => {
      document.body.classList.remove('opacity-0'); // Aseguramos que el fade-out no quede activo
    };
  }, []);

  return (
    <div className="bg-gray-900">
      {/* Header */}
      <header>
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
                ¡Hola! Soy un joven de 18 años apasionado por la tecnología y el desarrollo web. Actualmente estoy cursando el primer año de Desarrollo de Aplicaciones Web (DAW). En este curso, he trabajado con tecnologías como HTML, CSS, Java, entre otras. A través de este portfolio, quiero mostrar mis proyectos y el progreso que voy realizando, a medida que me adentro en el mundo del desarrollo web.
              </p>
              <a
                href={curriculumPDF}
                download="curriculum.pdf"
                className="bg-purple-300 text-gray-800 py-2 px-6 rounded-md hover:bg-pink-400 transition"
              >
                Descargar currículum
              </a>
            </div>
          </div>

          <div id="empresas" className="mt-10 text-center">
            <h3 className="text-2xl font-semibold text-white">Trabajé en:</h3>
            <button
              id="prysboton"
              className="mt-4 bg-purple-300 text-gray-800 py-2 px-6 rounded-md hover:bg-purple-400 transition"
              onClick={() => window.open('http://www.prys.es/', '_blank')}
              onMouseOver={handleHoverPrys}
              onMouseOut={handleMouseOutPrys}
            >
              PRYS
            </button>
            <div
              id="mapa-container"
              className="overflow-hidden transition-max-height duration-500"
              style={{ maxHeight: '0px' }}
            >
              {/* Aquí puede ir el mapa u otra información que se despliegue */}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-custom text-gray-800 py-0">
        <div className="container mx-auto px-4">
          <Footer />
        </div>
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-purple-900 hover:bg-purple-800 text-white p-3 rounded-full transition"
        >
          ↑
        </button>
      </footer>
    </div>
  );
};

export default Home;
