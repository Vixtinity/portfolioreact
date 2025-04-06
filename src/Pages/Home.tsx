import React from 'react';
import Header from '../components/Header';  // Asegúrate de que el Header esté en su propio archivo
import Footer from '../components/Footer';  // Asegúrate de que el Footer esté en su propio archivo

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <Header titulo="¿Quién soy?" />
      </header>

      {/* Main Content */}
      <main className="py-10 px-4 md:px-16">
        <section className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <aside id="asideimagen" className="text-center md:w-1/2">
            <img
              src="imagenes/fotomia.png" // Ruta de la imagen
              alt="Foto propia"
              loading="lazy"
              className="img-fluid rounded-full max-w-[250px] mx-auto"
            />
          </aside>
          <article id="descripcion" className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              <strong>Ismael Fernández López</strong>
            </h2>
            <p className="text-lg text-gray-600 mb-4">Desarrollador web apasionado por la tecnología.</p>
            <a
              href="/path-to-curriculum.pdf" // Enlace al archivo PDF de tu currículum
              download="curriculum"
              id="botondescargarcurriculum"
              className="btn btn-secondary bg-custom text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Descargar currículum
            </a>
          </article>
        </section>

        <section id="empresas" className="mt-10 text-center">
          <h3 className="text-2xl font-semibold text-gray-800">Trabajé en:</h3>
          <button
            id="prysboton"
            className="btn btn-dark mt-4 bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
            onClick={() => window.open('https://www.ejemplo.com', '_blank')}
          >
            Empresa Ejemplo
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
