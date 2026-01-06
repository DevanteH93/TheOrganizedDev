import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

export const dynamic = "force-dynamic";

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Failed to fetch products");
    return [];
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  let planner = null;
  let stickers = [];

  for (const product of products) {
    if (product.name === "Medieval Dragon Month Planner") {
      planner = product;
    } else {
      stickers.push(product);
    }
  }

  return (
    <>
      <ImageBanner />
      <Products planner={planner} stickers={stickers} />
    </>
  );
}
