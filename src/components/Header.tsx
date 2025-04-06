import React from 'react';

interface HeaderProps {
  titulo: string;
}

const Header: React.FC<HeaderProps> = ({ titulo }) => {
  return (
    <header className="bg-custom">
      <div className="text-center py-20">
        <h1
          className="text-white m-0 py-3 border-radi"
          style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: '3rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
            lineHeight: '1.3',
          }}
        >
          {titulo}
        </h1>
      </div>

      {/* Menu PC */}
      <nav className="navbar navbar-expand-lg bg-custom d-none d-lg-block" id="bootstrapmenu">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  ¿Quién soy?
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/habilidad">
                  Habilidades
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/proyectos">
                  Proyectos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contacto">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Menu móvil */}
      <div className="hamburger-menu d-lg-none">
        <input id="menu__toggle" type="checkbox" />
        <label className="menu__btn" htmlFor="menu__toggle">
          <span></span>
        </label>

        <ul className="menu__box">
          <li>
            <a className="menu__item" href="/index">
              ¿Quién soy?
            </a>
          </li>
          <li>
            <a className="menu__item" href="/habilidad">
              Habilidades
            </a>
          </li>
          <li>
            <a className="menu__item" href="/proyectos">
              Proyectos
            </a>
          </li>
          <li>
            <a className="menu__item" href="/contacto">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
