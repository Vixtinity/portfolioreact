import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import html from '../assets/images/htmllogo.png';
import css from '../assets/images/csslogo.png';
import sql from '../assets/images/mysqllogo.png';
import java from '../assets/images/javalogo.png';

const habilidades = {
  lenguajesAprendidos: ['JavaScript', 'Python', 'Java'],
  lenguajesEnAprendizaje: ['TypeScript', 'Go'],
  idiomas: [
    { nombre: 'Español', nivel: 'Nativo' },
    { nombre: 'Inglés', nivel: 'B2' }
  ]
};

const Habilidad: React.FC = () => {
  useEffect(() => {
    // Animaciones en imágenes
    const images = document.querySelectorAll('#aprendidas img, #en-aprendizaje img, footer img');

    const agrandarImagen = (e: Event) => {
      const target = e.target as HTMLImageElement;
      target.style.transition = 'transform 0.3s ease';
      target.style.transform = 'scale(1.2)';
    };

    const restaurarImagen = (e: Event) => {
      const target = e.target as HTMLImageElement;
      target.style.transition = 'transform 0.3s ease';
      target.style.transform = 'scale(1)';
    };

    images.forEach(img => {
      img.addEventListener('mouseover', agrandarImagen);
      img.addEventListener('mouseout', restaurarImagen);
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('mouseover', agrandarImagen);
        img.removeEventListener('mouseout', restaurarImagen);
      });
    };
  }, []);

  // Scroll hacia arriba suave
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Header */}
      <header className="text-white">
        <div className="container mx-auto px-4">
          <Header titulo="Habilidades" />
        </div>
      </header>

      {/* Contenido principal alineado a la izquierda */}
      <main className="max-w-6xl mx-auto my-10 px-4">
        <h2 className="text-white text-2xl font-semibold mb-4">Lenguajes aprendidos</h2>
        <section id="aprendidas" className="flex flex-wrap gap-4">
          <div>
            <img src={html} alt="HTML logo" className="rounded p-2 w-40 h-40 object-contain" />
          </div>
          <div>
            <img src={css} alt="CSS logo" className="rounded p-2 w-40 h-40 object-contain" />
          </div>
        </section>

        <h2 className="text-white text-2xl font-semibold mt-10 mb-4">Lenguajes en aprendizaje</h2>
        <section id="en-aprendizaje" className="flex flex-wrap gap-4">
          <div>
            <img src={java} alt="Java logo" className="rounded p-2 w-40 h-40 object-contain" />
          </div>
          <div>
            <img src={sql} alt="MySQL logo" className="rounded p-2 w-40 h-40 object-contain" />
          </div>
        </section>

        <section id="idiomas" className="mt-10">
          <h2 className="text-white text-2xl font-semibold mb-4">Idiomas</h2>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full text-left text-white bg-gray-800 border border-gray-700">
              <thead className="bg-gray-700 text-gray-200">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-600">Idioma</th>
                  <th className="px-4 py-2 border-b border-gray-600">Nivel</th>
                </tr>
              </thead>
              <tbody>
                {habilidades.idiomas.map((idioma) => (
                  <tr key={idioma.nombre} className="hover:bg-gray-600 transition">
                    <td className="px-4 py-2 border-b border-gray-700">{idioma.nombre}</td>
                    <td className="px-4 py-2 border-b border-gray-700">{idioma.nivel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer con botón de volver arriba */}
      <footer className="bg-custom text-white py-6 relative">
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

export default Habilidad;
