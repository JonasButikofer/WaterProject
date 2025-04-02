import { useState, ReactNode, createContext, useContext } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[];
    addtoCart: (item: CartItem) => void;
    removeFromCart: (projectId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addtoCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((c) => c.projectId === item.projectId);
            const updatedCart = prevCart.map((c) => 
                c.projectId === item.projectId
                    ? { ...c, donationAmount: c.donationAmount + item.donationAmount }
                    : c
            );
            return existingItem ? updatedCart : [...prevCart, item];
        });
    };

    const removeFromCart = (projectId: number) => {
        setCart((prevCart) => prevCart.filter((c) => c.projectId !== projectId));
    };

    const clearCart = () => {
        setCart(() => []);
    };

    return (
        <CartContext.Provider
            value={{cart, addtoCart, removeFromCart, clearCart}}>
                {children}
            </CartContext.Provider>
    )
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error ('useCart must be used within a CartProvider');
    }
    return context;
}
