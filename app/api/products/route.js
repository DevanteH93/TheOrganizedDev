import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function GET() {
  try {
    const products = await stripe.products.list({
      active: true,
      expand: ["data.default_price"],
    });

    const formatted = products.data.map(p => {
      const price = p.default_price;
      return {
        id: p.id,
        name: p.name,
        description: p.description,
        default_price: price?.id,
        prices: price ? [{
          id: price.id,
          unit_amount: price.unit_amount,
          currency: price.currency,
        }] : [],
      };
    });

    return Response.json(formatted);
  } catch (err) {
    console.error("Stripe error:", err);
    return Response.json([], { status: 500 });
  }
}
