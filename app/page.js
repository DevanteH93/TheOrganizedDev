import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export default async function Home() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  const productsRes = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });

  const products = productsRes.data.map(p => {
    const price = p.default_price;
    return {
      ...p,
      prices: price ? [{
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
      }] : [],
    };
  });

  let planner = null;
  let stickers = [];

  for (const product of products) {
    if (product.metadata?.type === "planner") {
      planner = product;
    } else {
      stickers.push(product);
    }
  }

  return (
    <>
      <ImageBanner />
      <section>
        <Products planner={planner} stickers={stickers} />
      </section>
    </>
  );
}
