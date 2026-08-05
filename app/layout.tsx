import "./globals.css";

export const metadata = {
  title: "Salon Meblowy Malinowski — Meble na wymiar",
  description: "Meble do kuchni, salonu, jadalni i gabinetu — od 31 lat.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header>
      <div className="nav-wrap">
        <div className="brand">
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img src="/logo.png" alt="Salon Meblowy Malinowski" className="brand-logo" />
          </a>
        </div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/katalog">Oferta</a></li>
            <li><a href="/#kuchnie">Kuchnie na wymiar</a></li>
            <li><a href="/#kontakt">Kontakt</a></li>
          </ul>
        </nav>
        <div className="nav-right">
          <a className="phone" href="tel:+48664934238">664 934 238</a>
          <a className="btn btn-solid" href="/#kontakt">Zamów wycenę</a>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="brand">
            <img src="/logo.png" alt="Salon Meblowy Malinowski" className="brand-logo brand-logo-footer" />
          </div>
          <p style={{ marginTop: 14, maxWidth: 280 }}>Meble od projektu po montaż.</p>
        </div>
        <div className="col">
          <h4>Kontakt</h4>
          <p>ul. Warmińska 16A, 14-300 Morąg</p>
          <a href="mailto:kontakt@salonmeblowy.pl">kontakt@salonmeblowy.pl</a>
          <a href="tel:+48664934238">664 934 238</a>
        </div>
        <div className="col">
          <h4>Social</h4>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Salon Meblowy Malinowski. Wszystkie prawa zastrzeżone.</span>
        <span>Projekt strony — Twój katalog na wymiar</span>
      </div>
    </footer>
  );
}
