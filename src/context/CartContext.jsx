import { createContext, useEffect, useState } from "react";



export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('uzum_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('uzum_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addCart = (product) => {
        setCartItems((prevItems) => {
            const isExit = prevItems.find(item => item.id === product.id);
            if (isExit) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFroma = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const update = (id, amount) => {
        setCartItems((prevItems) => {
            return prevItems
                .map(item => {
                    if (item.id === id) {
                        const newQuantity = item.quantity + amount;
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                })
                .filter(item => item.quantity > 0);
        });
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addCart, removeFroma, update, clearCart }}>
            {children}
        </CartContext.Provider>
    );

}