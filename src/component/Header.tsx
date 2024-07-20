import React from "react";

import Image from "next/image";

import BagIcon from '@/assets/BagIcon.svg';
import logoImg from '../assets/logo.svg';

import { BagImageContainer, Header as HeaderStyled } from "@/styles/pages/header";
import { useCart } from "@/context/CartContext";

export function Header(){
    const { cartCount } = useCart();

    return (
        <HeaderStyled>
            <Image src={logoImg} alt="" />
            <BagImageContainer>
                <Image src={BagIcon} alt=""/>
                {cartCount > 0 && <span>{cartCount}</span>}
            </BagImageContainer>
        </HeaderStyled>
    )
}