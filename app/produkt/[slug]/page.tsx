import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { notFound } from "next/navigation";

export const revalidate = 60;

async function getProduct(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id, name, price, category, collection, metaOpis,
      collectionDescription, productDescription, images
    }`,
    { slug }
  );
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) return notFound();

  return (
    <div className="product-detail">
      <div className="product-detail-gallery">
        {product.images?.length ? (
          product.images.map((img: any, i: number) => (
            <img key={i} src={urlFor(img).width(900).height(1125).url()} alt={product.name} />
          ))
        ) : (
          <div className="product-thumb"><span className="product-thumb-label">Zdjęcie niedostępne</span></div>
        )}
      </div>
      <div className="product-detail-info">
        <a className="product-detail-back" href="/katalog">← Wróć do katalogu</a>
        <div className="eyebrow">{product.category} {product.collection ? `· ${product.collection}` : ""}</div>
        <h1>{product.name}</h1>
        <div className="product-detail-price">
          {product.price ? `${product.price} zł` : "wycena indywidualna"}
        </div>
        {product.productDescription && (
          <p className="product-detail-desc">{product.productDescription}</p>
        )}
        {product.collectionDescription && (
          <p className="product-detail-desc">{product.collectionDescription}</p>
        )}
        <a className="btn btn-solid" href="/#kontakt">Zamów wycenę →</a>
      </div>
    </div>
  );
}
