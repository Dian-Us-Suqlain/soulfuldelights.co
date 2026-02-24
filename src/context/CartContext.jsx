import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Custom basket config during the builder steps
    const [currentBasket, setCurrentBasket] = useState({
        baseStyle: null,
        baseColor: null,
        ribbonStyle: null,
        flowers: [],
        chocolates: [],
        toys: [],
        stickers: [],
        card: null
    });

    const addToCart = (basketData, totalPrice) => {
        setCartItems(prev => [...prev, {
            id: Date.now().toString(),
            type: 'custom_basket',
            data: basketData,
            price: totalPrice
        }]);

        // Reset builder
        setCurrentBasket({
            baseStyle: null,
            baseColor: null,
            ribbonStyle: null,
            flowers: [],
            chocolates: [],
            toys: [],
            stickers: [],
            card: null
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            cartTotal,
            currentBasket,
            setCurrentBasket
        }}>
            {children}
        </CartContext.Provider>
    );
};
