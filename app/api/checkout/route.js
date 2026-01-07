import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  try {
    // Log environment variable
    console.log("STRIPE_SECRET_KEY exists:", !!process.env.STRIPE_SECRET_KEY);

    // Parse request body
    const { lineItems } = await req.json();
    console.log("lineItems received:", lineItems);

    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is missing!");
    }

    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return Response.json(
        { error: "No line items provided" },
        { status: 400 }
      );
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    console.log("Stripe session created:", session.id);

    return Response.json({ url: session.url });
  } catch (err) {
    // Log full error for debugging
    console.error("Stripe checkout error:", err);
    return Response.json(
      { 
        error: err.message || "Checkout failed", 
        stack: err.stack 
      },
      { status: 500 }
    );
  }
}



// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2023-10-16",
// });

// export async function POST(req) {
//   try {
//     if (!process.env.STRIPE_SECRET_KEY) {
//       throw new Error("STRIPE_SECRET_KEY is missing");
//     }

//     const { lineItems } = await req.json();

//     if (!Array.isArray(lineItems) || lineItems.length === 0) {
//       return Response.json(
//         { error: "No line items provided" },
//         { status: 400 }
//       );
//     }

//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       line_items: lineItems,
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
//     });

//     return Response.json({ url: session.url });
//   } catch (err) {
//     console.error("Stripe checkout error:", err);
//     return Response.json(
//       { error: err.message || "Checkout failed" },
//       { status: 500 }
//     );
//   }
// }