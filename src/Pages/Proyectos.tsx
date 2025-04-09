import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Importar imagen y PDF correctamente
import cowboy1 from '../assets/images/proyecto2.jpg';
import cowboy2 from '../assets/images/proyecto2-2.jpg';
import cowboy3 from '../assets/images/proyecto2-3.jpg';

const Proyecto: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4">
          <Header titulo="¿Quién soy?" />
        </div>
      </header>

      {/* Main Content */}
      <main th:fragment="mainP">
    <section class="contenedor-proyectos d-flex justify-content-center align-items-center" style="min-height: 60vh;">

        <article class="proyecto card mb-4 shadow-sm" style="max-width: 600px;">
            <div th:if="${#lists.isEmpty(proyecto1.imagenes)}" class="card-body">
                <img th:src="@{${proyecto1.imagenes[0]}}" alt="Imagen de proyecto" class="card-img-top" />
            </div>

            <div th:if="${proyecto1.imagenes.size() > 1}" class="carrusel-imagenes carousel slide" id="carrusel" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <th:block th:each="imagen, iterStat : ${proyecto1.imagenes}">
                        <div className="carousel-item" th:classappend="${iterStat.index == 0 ? 'active' : ''}">
                            <img th:src="@{${imagen}}" class="d-block w-100" alt="Imagen de proyecto" />
                        </div>
                    </th:block>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carrusel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carrusel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Siguiente</span>
                </button>
            </div>

            <div className="card-body">
                <h2 className="titulo-proyecto card-title" th:text="${proyecto1.nombre}"></h2>
                <p className="descripcion-proyecto card-text" th:text="${proyecto1.descripcion}"></p>
                <a th:href="@{${proyecto1.url}}" class="btn btn-primary" title="Ir al proyecto">Ir al proyecto</a>
            </div>
        </article>
        
    </section>
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

export default Proyecto;
