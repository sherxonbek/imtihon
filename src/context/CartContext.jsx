import { createContext, useEffect, useState } from "react";



export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    //itmlar state xolati

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('uzum_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    //vaqtincha keshlash uchun

    useEffect(() => {
        localStorage.setItem('uzum_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    //maxsulot qoshadi savatga
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

    //savatdagi maxsulot ochadi transh

    const removeFroma = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    //bu qoshib kamaytirish uchun qilindi bu joy samme ac dan copy ozim logika ishlamadi
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

        // bu joyi ham chopildi afsuski samm ac dan
        
        <CartContext.Provider value={{ cartItems, addCart, removeFroma, update, clearCart }}>
            {children}
        </CartContext.Provider>
    );

}