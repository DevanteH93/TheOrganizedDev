import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  try {
    // 1️⃣ Log environment variable
    console.log("STRIPE_SECRET_KEY exists:", !!process.env.STRIPE_SECRET_KEY);

    // 2️⃣ Safely read the request body
    const bodyText = await req.text();
    console.log("Raw request body:", bodyText);

    let body;
    try {
      body = JSON.parse(bodyText);
    } catch (err) {
      console.error("Invalid JSON received:", err);
      return Response.json(
        { error: "Invalid JSON" },
        { status: 400 }
      );
    }

    const { lineItems } = body;

    // 3️⃣ Validate lineItems
    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      console.error("No valid lineItems received");
      return Response.json(
        { error: "No line items provided" },
        { status: 400 }
      );
    }

    // 4️⃣ Ensure all items are safe JSON objects
    const sanitizedItems = lineItems.map((item, index) => {
      if (
        !item.price ||
        !item.quantity ||
        typeof item.price !== "string" ||
        typeof item.quantity !== "number"
      ) {
        console.warn(`Line item at index ${index} is invalid:`, item);
      }
      return {
        price: item.price,
        quantity: item.quantity,
      };
    });

    // 5️⃣ Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: sanitizedItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    console.log("Stripe session created:", session.id);

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return Response.json(
      {
        error: err.message || "Checkout failed",
        stack: err.stack,
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