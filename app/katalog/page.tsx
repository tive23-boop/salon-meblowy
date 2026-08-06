import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import Filters from "./Filters";

export const revalidate = 60;

const CATEGORIES = [
  "Komody", "Regały", "Witryny", "Szafy", "Szafki RTV", "Szafki nocne",
  "Szafki na buty", "Wieszaki", "Biurka", "Łóżka", "Oświetlenie",
  "Stoliki", "Lustra", "Toaletki", "Dodatki",
];

async function getProducts({
  category,
  collection,
  search,
}: {
  category?: string;
  collection?: string;
  search?: string;
}) {
  const conditions = ['_type == "product"'];
  const params: Record<string, any> = {};

  if (category) {
    conditions.push("category == $category");
    params.category = category;
  }
  if (collection) {
    conditions.push("collection == $collection");
    params.collection = collection;
  }
  if (search) {
    conditions.push("name match $search");
    params.search = `*${search}*`;
  }

  const query = `*[${conditions.join(" && ")}] | order(name asc){
    _id, name, "slug": slug.current, price, category, collection, images
  }`;
  return client.fetch(query, params);
}

async function getCollections(): Promise<[string, number][]> {
  const all: { collection: string }[] = await client.fetch(
    `*[_type == "product" && defined(collection)]{collection}`
  );
  const counts: Record<string, number> = {};
  for (const p of all) counts[p.collection] = (counts[p.collection] || 0) + 1;
  return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
}

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: { kategoria?: string; kolekcja?: string; szukaj?: string };
}) {
  const activeCategory = searchParams?.kategoria;
  const activeCollection = searchParams?.kolekcja;
  const activeSearch = searchParams?.szukaj;

  const [products, collections] = await Promise.all([
    getProducts({ category: activeCategory, collection: activeCollection, search: activeSearch }),
    getCollections(),
  ]);

  const title =
    activeSearch ? `Wyniki dla "${activeSearch}"` : activeCollection || activeCategory || "Wszystkie produkty";

  return (
    <>
      <div className="katalog-header">
        <div className="katalog-header-inner">
          <div className="eyebrow">Katalog</div>
          <h1 style={{ marginTop: 12 }}>{title}</h1>
          <div className="katalog-count">{products.length} produktów</div>

          <Filters
            collections={collections}
            activeCollection={activeCollection}
            activeSearch={activeSearch}
            activeCategory={activeCategory}
          />

          <div className="katalog-filters">
            <a href="/katalog" className={`katalog-filter-link ${!activeCategory ? "active" : ""}`}>
              Wszystkie kategorie
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
        <div className="katalog-empty">Brak produktów spełniających wybrane kryteria.</div>
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
                <span className="product-cat">{p.category} · {p.collection}</span>
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

