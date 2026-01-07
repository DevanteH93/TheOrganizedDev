'use client'

import { useProducts } from "@/context/ProductContent";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { cart, handleIncrementProduct } = useProducts();

  // 🔢 Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    const price = item.prices?.[0]?.unit_amount ?? 0;
    return total + price * item.quantity;
  }, 0);

  async function createCheckout() {
    try {
      const lineItems = cart.map(item => ({
        price: item.price_id,     // ✅ Stripe price ID string
        quantity: item.quantity, // ✅ number
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lineItems }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Checkout error:', data);
        return;
      }

      router.push(data.url);
    } catch (err) {
      console.error('Error creating checkout:', err);
    }
  }

  return (
    <section className="cart-section">
      <h2>Your Cart</h2>

      {cart.length === 0 && (
        <p>You have no items in your cart.</p>
      )}

      <div className="cart-container">
        {cart.map((item, index) => {
          const imgName =
            item.name === 'Medieval Dragon Month Planner'
              ? 'planner'
              : item.name
                  .replaceAll(' Sticker.png ', '')
                  .replaceAll(' ', '_');

          const imgUrl = `/low_res/${imgName}.jpeg`;

          return (
            <div key={index} className="cart-item">
              <img src={imgUrl} alt={`${imgName}-img`} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>

                <p>
                  {item.description.slice(0, 100)}
                  {item.description.length > 100 ? '...' : ''}
                </p>

                <h4>${item.prices[0].unit_amount / 100}</h4>

                <div className="quantity-container">
                  <p><strong>Quantity</strong></p>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      handleIncrementProduct(
                        item.price_id,
                        Number(newValue),
                        item,
                        true
                      );

                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>
            Total: <span>${(cartTotal / 100).toFixed(2)}</span>
          </h3>
        </div>
      )}

      <div className="checkout-container">
        <Link href="/">
          <button>&larr; Continue Shopping</button>
        </Link>

        <button onClick={createCheckout}>
          Checkout &rarr;
        </button>
      </div>
    </section>
  );
}