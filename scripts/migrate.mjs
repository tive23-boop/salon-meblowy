// Skrypt migracyjny: wczytuje data/products.json i tworzy dokumenty w Sanity,
// pobierajac zdjecia bezposrednio z serwera producenta i wgrywajac je do Sanity.
// Uruchamiany przez GitHub Actions (.github/workflows/migrate.yml) - NIE lokalnie.

import { createClient } from "@sanity/client";
import fs from "node:fs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Brak NEXT_PUBLIC_SANITY_PROJECT_ID lub SANITY_API_TOKEN w zmiennych srodowiskowych.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const products = JSON.parse(fs.readFileSync(new URL("../data/products.json", import.meta.url)));

async function uploadImage(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ! nie udalo sie pobrac ${url} (status ${res.status})`);
      return null;
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = url.split("/").pop() || "image.jpg";
    const asset = await client.assets.upload("image", buffer, { filename });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (err) {
    console.warn(`  ! blad przy ${url}:`, err.message);
    return null;
  }
}

async function run() {
  console.log(`Migracja ${products.length} produktow do Sanity (projekt: ${projectId}/${dataset})`);
  let done = 0;
  let skipped = 0;

  for (const p of products) {
    process.stdout.write(`[${done + skipped + 1}/${products.length}] ${p.name} ... `);

    // sprawdz czy juz istnieje (po slugu), zeby mozna bylo bezpiecznie wznowic przerwany import
    const existing = await client.fetch(`*[_type == "product" && slug.current == $slug][0]{_id}`, {
      slug: p.slug,
    });
    if (existing) {
      console.log("juz istnieje, pomijam");
      skipped++;
      continue;
    }

    const images = [];
    for (const url of p.images) {
      const img = await uploadImage(url);
      if (img) images.push(img);
    }

    const doc = {
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      code: p.code,
      price: p.price ? Number(p.price) : undefined,
      category: p.category,
      collection: p.collection,
      metaOpis: p.metaOpis || undefined,
      collectionDescription: p.collectionDescription || undefined,
      productDescription: p.productDescription || undefined,
      images,
      featured: !!p.featured,
    };

    await client.create(doc);
    console.log(`OK (${images.length} zdjec)`);
    done++;
  }

  console.log(`\nGotowe. Utworzono: ${done}, pominieto (juz istnialy): ${skipped}.`);
}

run().catch((err) => {
  console.error("Migracja przerwana bledem:", err);
  process.exit(1);
});
