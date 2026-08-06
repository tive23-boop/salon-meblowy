import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

export const revalidate = 60;

const CATEGORIES = [
  "Komody", "Regały", "Witryny", "Szafy", "Szafki RTV", "Szafki nocne",
  "Szafki na buty", "Wieszaki", "Biurka", "Łóżka", "Oświetlenie",
  "Stoliki", "Lustra", "Toaletki", "Dodatki",
];

async function getFeaturedProducts() {
  return client.fetch(
    `*[_type == "product" && featured == true] | order(_createdAt desc) [0...12]{
      _id, name, "slug": slug.current, price, category, images
    }`
  );
}

async function getCategoryCounts() {
  const rows: { category: string; count: number }[] = await client.fetch(
    `*[_type == "product" && defined(category)]{category} | order(category)`
  ).then((all: any[]) => {
    const counts: Record<string, number> = {};
    for (const p of all) counts[p.category] = (counts[p.category] || 0) + 1;
    return CATEGORIES.map((c) => ({ category: c, count: counts[c] || 0 }));
  });
  return rows;
}

export default async function HomePage() {
  const [featured, categoryCounts] = await Promise.all([
    getFeaturedProducts(),
    getCategoryCounts(),
  ]);
  const totalProducts = categoryCounts.reduce((sum, c) => sum + c.count, 0);

  return (
    <>
      <div className="cat-bar">
        <div className="cat-bar-inner">
          <a href="/katalog" className="active">Wszystkie</a>
          {CATEGORIES.map((c) => (
            <a key={c} href={`/katalog?kategoria=${encodeURIComponent(c)}`}>{c}</a>
          ))}
        </div>
      </div>

      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="eyebrow" style={{ marginBottom: 22 }}>Na rynku od 31 lat</div>
            <h1>Meble, które dopasujesz<br /><em>do swojego wnętrza</em></h1>
            <p>Szeroki wybór mebli do kuchni, salonu, jadalni i gabinetu — starannie wyselekcjonowanych od sprawdzonych producentów, od pojedynczego fotela po kompletną aranżację wnętrza.</p>
            <form action="/katalog" method="GET" className="katalog-search" style={{ marginBottom: 28 }}>
              <input
                type="text"
                name="szukaj"
                placeholder="Szukaj produktu…"
                className="katalog-search-input"
              />
              <button type="submit" className="katalog-search-btn">Szukaj</button>
            </form>
            <div className="hero-ctas">
              <a className="btn btn-solid" href="/katalog">Zobacz ofertę</a>
              <a className="btn" href="#kontakt">Zamów wycenę</a>
            </div>
            <div className="hero-stats">
              <div><div className="stat-num">31+</div><div className="stat-label">lat na rynku</div></div>
              <div><div className="stat-num">{totalProducts}</div><div className="stat-label">produktów w katalogu</div></div>
              <div><div className="stat-num">15</div><div className="stat-label">kategorii mebli</div></div>
            </div>
          </div>
          <div className="hero-panel">
            <div className="red-block"></div>
            <div className="hero-panel-tag">
              <b>Sprawdzeni producenci</b>
              Współpracujemy z renomowanymi markami meblarskimi, gwarantując najwyższą jakość wykonania.
            </div>
          </div>
        </div>
      </section>

      <section className="slider-section" id="polecane">
        <div className="slider-inner">
          <div className="slider-head">
            <div>
              <div className="eyebrow">Nowe kolekcje</div>
              <h2 style={{ marginBottom: 0 }}>Nowości</h2>
            </div>
          </div>
          <div className="product-track">
            {featured.map((p: any) => (
              <a key={p._id} href={`/produkt/${p.slug}`} className="product-card">
                <div className="product-thumb">
                  {p.images?.[0] ? (
                    <img
                      src={urlFor(p.images[0]).width(520).height(650).url()}
                      alt={p.name}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span className="product-thumb-label">Zdjęcie niedostępne</span>
                  )}
                </div>
                <div className="product-info">
                  <span className="product-cat">{p.category}</span>
                  <div className="product-name">{p.name}</div>
                  <div className="product-price">{p.price ? `${p.price} zł` : "wycena indywidualna"}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="block-divider"><span></span><span></span><span></span></div>

      <section className="kitchens" id="kuchnie">
        <div className="kitchens-inner">
          <div className="kitchens-visual"></div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Realizacja na zamówienie</div>
            <h2>Wyjątkowe kuchnie na wymiar</h2>
            <p>Kuchnie, które łączą funkcjonalność z nowoczesną estetyką — projektowane indywidualnie pod wymiary i styl Twojej przestrzeni, realizowane przez sprawdzonych producentów mebli kuchennych.</p>
            <a className="btn" href="#kontakt">Zamów wycenę →</a>
          </div>
        </div>
      </section>

      <section className="categories" id="oferta">
        <div className="cat-inner">
          <div className="section-head">
            <div>
              <div className="eyebrow">Katalog</div>
              <h2 style={{ marginBottom: 0 }}>Nasze kategorie</h2>
            </div>
            <p>Wybieramy dla Ciebie meble najwyższej jakości, które łączą rzemiosło z nowoczesnym designem — od narożników po kompletne zabudowy.</p>
          </div>
          <div className="cat-grid">
            {categoryCounts.map((c, i) => (
              <a
                key={c.category}
                href={`/katalog?kategoria=${encodeURIComponent(c.category)}`}
                className="cat-card"
                style={{ textDecoration: "none" }}
              >
                <span className="cat-num">{String(i + 1).padStart(2, "0")} · {c.count}</span>
                <div className="cat-name">{c.category}</div>
              </a>
            ))}
            <div className="cat-card" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <a href="/katalog" style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "0.78rem", color: "var(--red)", textDecoration: "none" }}>
                Zobacz cały katalog →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="why">
        <div className="why-inner">
          <div className="section-head">
            <div>
              <div className="eyebrow">Dlaczego my</div>
              <h2 style={{ marginBottom: 0 }}>Dlaczego wybierają nas?</h2>
            </div>
            <p>Trzy filary, na których budujemy każdą realizację.</p>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <span className="why-mark">I.</span>
              <h3>Wieloletnie doświadczenie</h3>
              <p>Od 31 lat dostarczamy meble najwyższej jakości, starannie wybierane spośród najlepszych producentów na rynku.</p>
            </div>
            <div className="why-card">
              <span className="why-mark">II.</span>
              <h3>Renomowani producenci</h3>
              <p>Wspieramy tylko najbardziej prestiżowe firmy, które spełniają najwyższe standardy jakości i rzemiosła.</p>
            </div>
            <div className="why-card">
              <span className="why-mark">III.</span>
              <h3>Indywidualne podejście</h3>
              <p>Tworzymy rozwiązania łączące funkcjonalność z estetyką, dopasowane do Twoich potrzeb.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-strip" id="kontakt">
        <div className="cta-inner">
          <h3>Umów bezpłatną wycenę już dziś</h3>
          <a className="btn btn-dark" href="mailto:salonmeblowy@op.pl">Napisz do nas →</a>
        </div>
      </div>
    </>
  );
}
