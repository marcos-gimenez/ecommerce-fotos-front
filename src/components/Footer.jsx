import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Bloque principal */}
        <div className="footer-main">
          {/* Identidad */}
          <div className="footer-block">
            <h4 className="footer-title">PAMPA FOTO</h4>
            <p className="footer-text">
              Volvé a vivir ese instante.
              <br />
              La emoción del momento, convertida en recuerdo.
            </p>
          </div>

          {/* Contacto */}
          <div className="footer-block">
            <h4 className="footer-title">Contacto</h4>

            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <span className="footer-icon">📧</span>
                <span>contacto@pampafoto.com</span>
              </div>

              <div className="footer-contact-item">
                <span className="footer-icon">📱</span>
                <a
                  href="https://wa.me/5491100000000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +54 9 11 0000-0000
                </a>
              </div>

              <div className="footer-contact-item instagram">
                <span className="footer-icon">📸</span>
                <a
                  href="https://instagram.com/pampafoto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @pampafoto
                </a>
              </div>
            </div>
          </div>

          {/* Info legal / confianza */}
          <div className="footer-block">
            <h4 className="footer-title">Información</h4>
            <p className="footer-text">
              Las imágenes se entregan en alta resolución
              <br />y sin marca de agua.
            </p>
            <p className="footer-links">
              <a href="/terminos">Términos</a>
              <span>·</span>
              <a href="/privacidad">Privacidad</a>
            </p>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} PAMPA FOTO · Todos los derechos
            reservados
          </span>

          <span className="footer-dev">
            Desarrollo: <strong>Marcos Giménez</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
