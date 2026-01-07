'use client';

import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export default function ProductsProvider({ children }) {
    // Change cart from an object to an array for easier multi-item handling
    const [cart, setCart] = useState([]);

function handleIncrementProduct(price_id, num, data, noIncrement = false) {
  // ✅ force string
  const safePriceId =
    typeof price_id === 'string' ? price_id : price_id.id;

  setCart(prevCart => {
    const index = prevCart.findIndex(
      item => item.price_id === safePriceId
    );

    let newCart = [...prevCart];

    if (index !== -1) {
      newCart[index] = {
        ...newCart[index],
        quantity: noIncrement
          ? Number(num)
          : newCart[index].quantity + Number(num),
      };

      if (newCart[index].quantity <= 0) {
        newCart.splice(index, 1);
      }
    } else {
      newCart.push({
        ...data,
        price_id: safePriceId, // ✅ GUARANTEED STRING
        quantity: Number(num),
      });
    }

    return newCart;
  });
}



    const value = {
        cart,
        handleIncrementProduct
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProducts = () => useContext(ProductContext);