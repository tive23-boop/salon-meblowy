const CATEGORIES = [
  "Komody", "Regały", "Witryny", "Szafy", "Szafki RTV", "Szafki nocne",
  "Szafki na buty", "Wieszaki", "Biurka", "Łóżka", "Oświetlenie",
  "Stoliki", "Lustra", "Toaletki", "Dodatki",
];

export default function WkrotcePage() {
  return (
    <div className="wkrotce-wrap">
      <div className="block-divider"><span></span><span></span><span></span></div>

      <div className="wkrotce-marquee">
        <div className="wkrotce-marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>NOWA STRONA&nbsp;&nbsp;•&nbsp;&nbsp;JUŻ WKRÓTCE&nbsp;&nbsp;•&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>

      <div className="wkrotce-hero">
        <div className="wkrotce-bg-text" aria-hidden="true">WKRÓTCE</div>
        <div className="wkrotce-red-block wkrotce-red-block-1"></div>
        <div className="wkrotce-red-block wkrotce-red-block-2"></div>

        <div className="wkrotce-content">
          <div className="wkrotce-logo-chip">
            <img src="/logo.png" alt="Salon Meblowy Malinowski" className="wkrotce-logo" />
          </div>
          <div className="eyebrow wkrotce-eyebrow">Nowa odsłona salonu</div>
          <h1>Pracujemy nad<br /><em>nową stroną</em></h1>
          <p>
            Pełny katalog naszej oferty, wygodne wyszukiwanie i szybki kontakt —
            już wkrótce w nowej odsłonie. Do tego czasu zapraszamy do kontaktu telefonicznego lub mailowego.
          </p>
          <div className="wkrotce-contact">
            <a className="btn btn-solid" href="tel:+48664934238">664 934 238</a>
            <a className="btn wkrotce-btn-outline" href="mailto:salonmeblowy@op.pl">salonmeblowy@op.pl</a>
          </div>

          <div className="wkrotce-categories">
            <span className="wkrotce-categories-label">Już wkrótce w ofercie</span>
            <div className="wkrotce-cat-list">
              {CATEGORIES.map((c) => (
                <span key={c} className="wkrotce-cat-pill">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="wkrotce-marquee">
        <div className="wkrotce-marquee-track wkrotce-marquee-track-reverse">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>31 LAT DOŚWIADCZENIA&nbsp;&nbsp;•&nbsp;&nbsp;MEBLE NA WYMIAR&nbsp;&nbsp;•&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>

      <div className="block-divider"><span></span><span></span><span></span></div>
    </div>
  );
}
