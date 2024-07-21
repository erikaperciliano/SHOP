import { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  [x: string]: any;
  id: string;
  name: string;
  imageUrl: string;
  price: string;
}

interface CartContextData {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    cartCount: number;
  }

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode}){
    const [cart, setCart] = useState<Product[]>([])

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                // Increase the quantity if the item is already in the cart
                return prevCart.map(item => 
                    item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                );
            } else {
                // Add new item with initial quantity 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };


    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter(product => product.id !== productId));
    }

    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    return useContext(CartContext)
}