import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Importar imagen y PDF correctamente
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
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Header */}
      <header className=" text-white">
        <div className="container mx-auto px-4">
          <Header titulo="Habilidades" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto my-10 px-4">
        <h2 className="text-white text-left text-2xl font-semibold mb-4">Lenguajes aprendidos</h2>

        <section id="aprendidas" className="flex flex-wrap gap-4">
  <div>
    <img
      src={html}
      alt="Logotipo de HTML, lenguaje de programación"
      className="rounded p-2 w-40 h-40 object-contain"
    />
  </div>
  <div>
    <img
      src={css}
      alt="Logotipo de CSS, lenguaje de programación"
      className="rounded p-2 w-45 h-43 object-contain"
    />
  </div>
</section> {/* 👈 cierre correcto aquí */}

<h2 className="text-white text-left text-2xl font-semibold mt-10 mb-4">Lenguajes en aprendizaje</h2>

<section id="en-aprendizaje" className="flex flex-wrap gap-4">
  <div>
    <img
      src={java}
      alt="Logotipo de Java, lenguaje de programación"
      className="rounded p-2 w-40 h-40 object-contain"
    />
  </div>
  <div>
    <img
      src={sql}
      alt="Logotipo de MySQL, lenguaje de programación"
      className="rounded p-2 w-40 h-40 object-contain"
    />
  </div>
</section>



        <section id="idiomas" className="mt-10">
          <h2 className="text-white text-left text-2xl font-semibold mb-4">Idiomas</h2>
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
                  <tr
                    key={idioma.nombre}
                    className="hover:bg-gray-600 transition"
                  >
                    <td className="px-4 py-2 border-b border-gray-700">{idioma.nombre}</td>
                    <td className="px-4 py-2 border-b border-gray-700">{idioma.nivel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-6">
        <div className="container mx-auto px-4">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Habilidad;
