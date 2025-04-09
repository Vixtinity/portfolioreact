// src/components/Header.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router";
import '../styles/Header.css';

interface HeaderProps {
  titulo: string;
}

const Header: React.FC<HeaderProps> = () => {
  const pagina = useLocation();

  let titulo = '';

  if (pagina.pathname === '/habilidad') {
    titulo = 'Habilidades';
  } else if (location.pathname === '/proyectos') {
    titulo = 'Proyectos';
  } else if (location.pathname === '/contacto') {
    titulo = 'Contacto';
  } else {
    titulo = '¿Quién soy?';
  }

  return (
    <header className="bg-custom">
      <div className="text-center">
        <h1

        >
          {titulo}
        </h1>
      </div>

      {/* Menú grande (pantallas grandes) */}
      <nav className="hidden lg:flex justify-center bg-custom">
        <ul className="flex space-x-10">
          <li>
            <Link to="/"
              className={`text-white hover:text-gray-300 transition ${location.pathname === '/' ? 'text-gray-300' : ''}`}
            >
              ¿Quién soy?
            </Link>
          </li>
          <li>
            <Link to= "/habilidad"
              className={`text-white hover:text-gray-300 transition ${location.pathname === '/habilidad' ? 'text-gray-300' : ''}`}
            >
              Habilidades
            </Link>
          </li>
          <li>
            <Link to="/proyectos"
              className={`text-white hover:text-gray-300 transition ${location.pathname === '/proyectos' ? 'text-gray-300' : ''}`}
            >
              Proyectos
            </Link>
          </li>
          <li>
            <Link to="/contacto"
              className={`text-white hover:text-gray-300 transition ${location.pathname === '/contacto' ? 'text-gray-300' : ''}`}
            >
              Contacto
            </Link>
          </li>
        </ul>
      </nav>

      {/* Menú móvil */}
      <div className="lg:hidden px-4 pb-6">
        <input id="menu__toggle" type="checkbox" className="hidden peer" />
        <label
          htmlFor="menu__toggle"
          className="block cursor-pointer w-8 h-6 relative"
        >
          <span className="block w-full h-1 bg-white absolute top-0 transition duration-300"></span>
          <span className="block w-full h-1 bg-white absolute top-2 transition duration-300"></span>
          <span className="block w-full h-1 bg-white absolute top-4 transition duration-300"></span>
        </label>

        <ul className="peer-checked:block hidden mt-4 space-y-4 bg-custom p-4 rounded-md shadow-md">
          <li>
          <Link to="/habilidad" className="block text-white hover:text-gray-300">
              Habilidades
            </Link>
          </li>
          <li>
            <a href="/habilidad" className="block text-white hover:text-gray-300">
              Habilidades
            </a>
          </li>
          <li>
            <a href="/proyectos" className="block text-white hover:text-gray-300">
              Proyectos
            </a>
          </li>
          <li>
            <a href="/contacto" className="block text-white hover:text-gray-300">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
