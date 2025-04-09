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
    console.log(formData);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Header */}
      <header className=" bg-gray-900 text-white">
        <div className="bg-gray-900 container mx-auto px-4">
          <Header titulo="Contacto" />
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="bg-gray-900 container mx-auto py-10 px-4 md:px-16">
          {/* Formulario de Contacto */}
          <section className="mt-10">
            <h3 className="text-2xl font-semibold text-white text-center mb-4">
              Contáctame
            </h3>
            <div className="flex justify-center">
              <div className="bg-custom p-6 rounded w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="nombre" className="text-white block text-lg mb-2">Nombre:</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="form-input w-full p-2 border border-white rounded text-white"
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
                      className="text-white form-input w-full p-2 border rounded"
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
                      className="text-white form-input w-full p-2 border rounded"
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
                      className="form-textarea w-full p-2 border text-white rounded"
                      placeholder="Escribe tu mensaje aquí"
                      value={formData.mensaje}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      id="botonenviar"
                      className="btn btn-primary w-full py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
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
      <footer className="bg-custom text-white py-6">
        <div className="container mx-auto px-4">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Contacto;
