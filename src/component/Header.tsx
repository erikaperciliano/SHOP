import React, { useState } from "react";

import Image from "next/image";

import BagIcon from '@/assets/BagIcon.svg';
import logoImg from '../assets/logo.svg';

import { BagImageContainer, Header as HeaderStyled } from "@/styles/pages/header";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Modal } from "./Modal";
import { BuyNowButton, ModalFooter, RemoveButton } from "@/styles/pages/modal";
import axios from "axios";

export function Header(){
    const { cart, cartCount, removeFromCart  } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace('€', '').replace(',', '.'));
            return total + price * item.quantity;
        }, 0).toFixed(2); 
    };

    const handleBuyNow = async () => {
        setIsCreatingCheckoutSession(true);
    
        const items = cart.map(item => ({
            priceId: item.defaultPriceId,
            quantity: item.quantity
        }));
    
        try {
            const response = await axios.post('/api/checkout', { items });
    
            const { checkoutUrl } = response.data;
            window.location.href = checkoutUrl;
        } catch (err) {
            console.error('Checkout error:', err); // Log do erro para depuração
            setIsCreatingCheckoutSession(false);
            alert('Failed to redirect to checkout: ' + err.message);
        }
    };
    

    return (
        <>
            <HeaderStyled>
                <Link href='/'>
                    <Image src={logoImg} alt="" />
                </Link>
                <BagImageContainer onClick={handleOpenModal}>
                    <Image src={BagIcon} alt=""/>
                    {cartCount > 0 && <span>{cartCount}</span>}
                </BagImageContainer>
            </HeaderStyled>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2>Shopping bag</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={`${item.id}-${index}`}>
                                <Image src={item.imageUrl} alt={item.name} width={50} height={50} />
                                <div>
                                    <strong>{item.name}</strong>
                                    <p>{item.price}</p>
                                    <RemoveButton onClick={() => removeFromCart(item.id)}>Remove</RemoveButton>
                                </div>
                               
                            </li>
                        ))}
                    </ul>
                )}
                {cart.length > 0 && (
                    <ModalFooter>
                        {cart.length > 1 ? (
                            <p>Quantity: <span>{cartCount} items</span></p>
                        ): (
                            <p>Quantity: <span>{cartCount} item</span></p>
                        )}
                        <p><strong>Amount: </strong><span><strong>€ {calculateTotal()}</strong></span></p>
                        <BuyNowButton 
                            disabled={isCreatingCheckoutSession} 
                            onClick={handleBuyNow}
                        >
                            {isCreatingCheckoutSession ? 'Processing...' : 'Finalize purchases'}
                        </BuyNowButton>
                    </ModalFooter>
                )}
            </Modal>
        </>
        
    )
}