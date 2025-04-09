import React from 'react';
import linkedin from '../assets/images/linkedin.png';
import twitter from '../assets/images/twitter.png';
import infojobs from '../assets/images/infojobs.png';
import botonvolver from '../assets/images/flechaarriba.png';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="bg-custom text-white py-6 text-center">
      {/* Botón volver arriba */}
      <a href="#" aria-label="Volver al inicio de la página" className="inline-block mb-2">
        <img
          src={botonvolver}
          alt="Botón para volver al inicio"
          loading="lazy"
          className="mx-auto"
          width="30"
        />
      </a>
      <p className="mb-4">Volver arriba</p>

      {/* Redes sociales */}
      <section
        id="redes-sociales"
        className="flex justify-center items-center gap-6"
      >
        <a
          href="https://www.linkedin.com/in/ismael-fernandez-917b5b334/"
          aria-label="Perfil de LinkedIn de Ismael Fernández López"
        >
          <img
            src={linkedin}
            alt="Icono de LinkedIn"
            loading="lazy"
            width="30"
          />
        </a>
        <a
          href="https://x.com/Vixtinity"
          aria-label="Perfil de Twitter de Ismael Fernández López"
        >
          <img
            src={twitter}
            alt="Icono de Twitter"
            loading="lazy"
            width="30"
          />
        </a>
        <a
          href="https://www.infojobs.net/"
          aria-label="Página de InfoJobs"
        >
          <img
            src={infojobs}
            alt="Icono de InfoJobs"
            loading="lazy"
            width="30"
          />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
