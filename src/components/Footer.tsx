import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-custom text-white py-3 text-center">
      <a href="#" aria-label="Volver al inicio de la página">
        <img 
          src="imagenes/flechaarriba.png" 
          alt="Botón para volver al inicio" 
          loading="lazy" 
          className="img-fluid" 
          width="30" 
        />
      </a>
      <p>Volver arriba</p>
      <section id="redes-sociales" className="d-flex justify-content-center">
        <a 
          href="https://www.linkedin.com/in/ismael-fernandez-917b5b334/" 
          aria-label="Perfil de LinkedIn de Ismael Fernández López" 
          className="px-2"
        >
          <img 
            src="imagenes/linkedin.png" 
            alt="Icono de LinkedIn" 
            id="Linkedin" 
            loading="lazy" 
            width="30" 
          />
        </a>
        <a 
          href="https://x.com/Vixtinity" 
          aria-label="Perfil de Twitter de Ismael Fernández López" 
          className="px-2"
        >
          <img 
            src="imagenes/twitter.png" 
            alt="Icono de Twitter" 
            id="Twitter" 
            loading="lazy" 
            width="30" 
          />
        </a>
        <a 
          href="https://www.infojobs.net/" 
          aria-label="Página de InfoJobs" 
          className="px-2"
        >
          <img 
            src="imagenes/infojobs.png" 
            alt="Icono de InfoJobs" 
            id="Infojobs" 
            loading="lazy" 
            width="30" 
          />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
