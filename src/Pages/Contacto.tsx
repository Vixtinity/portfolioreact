import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario (por ejemplo, con una API)
    console.log(formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4">
          <Header titulo="Contacto" />
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="container mx-auto py-10 px-4 md:px-16">
          {/* Formulario de Contacto */}
          <section className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Contáctame
            </h3>
            <div className="flex justify-center">
              <div className="bg-custom p-6 rounded w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="nombre" className="block text-lg mb-2">Nombre:</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="form-input w-full p-2 border border-gray-300 rounded"
                      required
                      placeholder="Introduce tu nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-lg mb-2">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input w-full p-2 border border-gray-300 rounded"
                      required
                      placeholder="Introduce tu email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="telefono" className="block text-lg mb-2">Número de Teléfono:</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      className="form-input w-full p-2 border border-gray-300 rounded"
                      required
                      placeholder="Introduce tu teléfono"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="mensaje" className="block text-lg mb-2">Mensaje:</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      className="form-textarea w-full p-2 border border-gray-300 rounded"
                      placeholder="Escribe tu mensaje aquí"
                      value={formData.mensaje}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      id="botonenviar"
                      className="btn btn-primary w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Contacto;
