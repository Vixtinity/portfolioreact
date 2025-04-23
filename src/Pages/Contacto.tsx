import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    alert('Formulario enviado exitosamente. ¡Gracias por tu mensaje!');
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
    });
  };

  // Mostrar el botón de volver arriba si se hace scroll hacia abajo
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Volver arriba con scroll suave
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 min-h-screen transition-opacity duration-500 relative">
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <Header titulo="Contacto" />
        </div>
      </header>

      <main>
        <div className="container mx-auto py-10 px-4 md:px-16">
          <section className="mt-10">
            <h3 className="text-2xl font-semibold text-white text-center mb-4">Contáctame</h3>
            <div className="flex justify-center">
              <div className="bg-custom p-6 rounded w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="nombre" className="text-white block text-lg mb-2">Nombre:</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="form-input w-full p-2 border border-white rounded text-white bg-transparent"
                      required
                      placeholder="Introduce tu nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="text-white block text-lg mb-2">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input w-full p-2 border border-white rounded text-white bg-transparent"
                      required
                      placeholder="Introduce tu email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="telefono" className="text-white block text-lg mb-2">Número de Teléfono:</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      className="form-input w-full p-2 border border-white rounded text-white bg-transparent"
                      required
                      placeholder="Introduce tu teléfono"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="mensaje" className="text-white block text-lg mb-2">Mensaje:</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      className="form-textarea w-full p-2 border border-white rounded text-white bg-transparent"
                      placeholder="Escribe tu mensaje aquí"
                      value={formData.mensaje}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      id="botonenviar"
                      className="w-full py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300 transform hover:scale-105"
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-custom text-white py-6">
        <div className="container mx-auto px-4">
          <Footer />
        </div>
      </footer>

      {/* Botón volver arriba solo visible en móviles */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-pink-400 text-white px-4 py-2 rounded-full shadow-lg z-50 md:hidden hover:bg-pink-500 transition"
          aria-label="Volver arriba"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Contacto;
