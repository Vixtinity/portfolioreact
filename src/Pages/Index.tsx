import React from 'react';
import Header from '../components/Header';  // Asegúrate de que el Header esté en su propio archivo
import Footer from '../components/Footer';  // Asegúrate de que el Footer esté en su propio archivo

const Index: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <Header titulo="¿Quién soy?" />
      </header>

      {/* Main Content */}
      <main className="py-5">
        <section>
          <aside id="asideimagen" className="col-md-6 text-center">
            <img
              src="imagenes/fotomia.png" // Ruta de la imagen
              alt="Foto propia"
              loading="lazy"
              className="img-fluid rounded-circle"
            />
          </aside>
          <article id="descripcion" className="col-md-6">
            <h2><strong>Ismael Fernández López</strong></h2>
            <p>Desarrollador web apasionado por la tecnología.</p>
            <a
              href="/path-to-curriculum.pdf" // Enlace al archivo PDF de tu currículum
              download="curriculum"
              id="botondescargarcurriculum"
              className="btn btn-secondary bg-custom"
            >
              Descargar currículum
            </a>
          </article>
        </section>

        <section id="empresas" className="mt-5">
          <h3 className="text-white">Trabajé en:</h3>
          <button
            id="prysboton"
            className="btn btn-dark"
            onClick={() => window.open('https://www.ejemplo.com', '_blank')}
          >
            Empresa Ejemplo
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Index;
