import { createContext, useContext, useState, ReactNode } from "react";

interface Product {
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

    const cartCount = cart.length; // Compute cart count

    const addToCart = (product: Product) => {
        setCart((prevCart) => [...prevCart, product]);
    }

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter(product => product.id !== productId));
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    return useContext(CartContext)
}