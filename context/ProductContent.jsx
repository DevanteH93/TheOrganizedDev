'use client';

import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export default function ProductsProvider({ children }) {
    // Change cart from an object to an array for easier multi-item handling
    const [cart, setCart] = useState([]);

    function handleIncrementProduct(price_id, num, data, noIncrement = false) {
        setCart(prevCart => {
            // Check if this product is already in the cart
            const index = prevCart.findIndex(item => item.price_id === price_id);
            let newCart = [...prevCart];

            if (index !== -1) {
                // Update quantity
                newCart[index] = {
                    ...newCart[index],
                    quantity: noIncrement ? num : newCart[index].quantity + num
                };

                // Remove if quantity is 0 or less
                if (newCart[index].quantity <= 0) {
                    newCart.splice(index, 1);
                }
            } else {
                // Add new item
                newCart.push({
                    ...data,
                    price_id,
                    quantity: num
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