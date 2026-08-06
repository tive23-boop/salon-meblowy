"use client";

import { useRouter } from "next/navigation";

export default function Filters({
  collections,
  activeCollection,
  activeSearch,
  activeCategory,
}: {
  collections: [string, number][];
  activeCollection?: string;
  activeSearch?: string;
  activeCategory?: string;
}) {
  const router = useRouter();

  function buildUrl(overrides: Record<string, string | undefined>) {
    const merged: Record<string, string | undefined> = {
      kategoria: activeCategory,
      kolekcja: activeCollection,
      szukaj: activeSearch,
      ...overrides,
    };
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(merged)) {
      if (v) params.set(k, v);
    }
    const qs = params.toString();
    return `/katalog${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="katalog-toolbar">
      <form
        className="katalog-search"
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem("q") as HTMLInputElement;
          router.push(buildUrl({ szukaj: input.value || undefined }));
        }}
      >
        <input
          type="text"
          name="q"
          placeholder="Szukaj produktu…"
          defaultValue={activeSearch || ""}
          className="katalog-search-input"
        />
        <button type="submit" className="katalog-search-btn">Szukaj</button>
      </form>

      <select
        className="katalog-collection-select"
        defaultValue={activeCollection || ""}
        onChange={(e) => router.push(buildUrl({ kolekcja: e.target.value || undefined }))}
      >
        <option value="">Wszystkie kolekcje</option>
        {collections.map(([name, count]) => (
          <option key={name} value={name}>
            {name} ({count})
          </option>
        ))}
      </select>
    </div>
  );
}
