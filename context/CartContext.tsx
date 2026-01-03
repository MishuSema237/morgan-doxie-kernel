'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartContextType {
    cart: { puppyId: string; puppy: any } | null;
    addToCart: (puppy: any) => void;
    removeFromCart: () => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<{ puppyId: string; puppy: any } | null>(null);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('bullify_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        if (cart) {
            localStorage.setItem('bullify_cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('bullify_cart');
        }
    }, [cart]);

    const addToCart = (puppy: any) => {
        // We treat the cart as a single item holder for now (one puppy at a time usually for these sites)
        // But object structure allows expansion.
        // Using puppy._id as the ID.
        const item = { puppyId: puppy._id || puppy.id, puppy };
        setCart(item);
    };

    const removeFromCart = () => {
        setCart(null);
    };

    const clearCart = () => {
        setCart(null);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
