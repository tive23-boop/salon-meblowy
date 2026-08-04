import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

export const revalidate = 60;

const CATEGORIES = [
  "Komody", "Regały", "Witryny", "Szafy", "Szafki RTV", "Szafki nocne",
  "Szafki na buty", "Wieszaki", "Biurka", "Łóżka", "Oświetlenie",
  "Stoliki", "Lustra", "Toaletki", "Dodatki",
];

async function getProducts(category?: string) {
  const filter = category ? `&& category == $category` : "";
  return client.fetch(
    `*[_type == "product" ${filter}] | order(name asc){
      _id, name, "slug": slug.current, price, category, images
    }`,
    category ? { category } : {}
  );
}

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: { kategoria?: string };
}) {
  const activeCategory = searchParams?.kategoria;
  const products = await getProducts(activeCategory);

  return (
    <>
      <div className="katalog-header">
        <div className="katalog-header-inner">
          <div className="eyebrow">Katalog</div>
          <h1 style={{ marginTop: 12 }}>{activeCategory || "Wszystkie produkty"}</h1>
          <div className="katalog-count">{products.length} produktów</div>
          <div className="katalog-filters">
            <a href="/katalog" className={`katalog-filter-link ${!activeCategory ? "active" : ""}`}>
              Wszystkie
            </a>
            {CATEGORIES.map((c) => (
              <a
                key={c}
                href={`/katalog?kategoria=${encodeURIComponent(c)}`}
                className={`katalog-filter-link ${activeCategory === c ? "active" : ""}`}
              >
                {c}
              </a>
            ))}
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="katalog-empty">Brak produktów w tej kategorii.</div>
      ) : (
        <div className="katalog-grid">
          {products.map((p: any) => (
            <a key={p._id} href={`/produkt/${p.slug}`} className="product-card">
              <div className="product-thumb">
                {p.images?.[0] ? (
                  <img
                    src={urlFor(p.images[0]).width(420).height(525).url()}
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
      )}
    </>
  );
}
