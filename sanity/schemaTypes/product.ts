import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Produkt",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nazwa",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (adres URL)",
      type: "slug",
      options: { source: "name", maxLength: 200 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Kod produktu",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Cena (zł)",
      type: "number",
    }),
    defineField({
      name: "category",
      title: "Kategoria",
      type: "string",
      options: {
        list: [
          "Komody", "Regały", "Witryny", "Szafy", "Szafki RTV",
          "Szafki nocne", "Szafki na buty", "Wieszaki", "Biurka",
          "Łóżka", "Oświetlenie", "Stoliki", "Lustra", "Toaletki", "Dodatki",
        ],
      },
    }),
    defineField({
      name: "collection",
      title: "Kolekcja",
      type: "string",
    }),
    defineField({
      name: "metaOpis",
      title: "Krótki opis (typ mebla)",
      type: "string",
    }),
    defineField({
      name: "collectionDescription",
      title: "Opis kolekcji",
      type: "text",
    }),
    defineField({
      name: "productDescription",
      title: "Opis produktu",
      type: "text",
    }),
    defineField({
      name: "images",
      title: "Zdjęcia",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "featured",
      title: "Pokaż na stronie głównej (Nowości)",
      type: "boolean",
      initialValue: false,
      description: "Zaznacz, żeby ten produkt pojawił się w sekcji 'Nowości' na stronie głównej.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "images.0" },
  },
});
