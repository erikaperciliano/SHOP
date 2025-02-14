import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"

import { HomeContainer, Product } from "@/styles/pages/home"

import BagIcon from '@/assets/BagIcon.svg'

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from "@/lib/stripe"

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"
import { useCart } from "@/context/CartContext"

interface HomeProps {
    products: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
    }[]
}

export default function Home({ products }: HomeProps) {
    const [sliderRef]= useKeenSlider({
        slides: {
            perView: 3,
            spacing: 48
        }
    })

    const { addToCart } = useCart();

    return (
        <>
            <Head>
                <title> Home | SHOP</title>
            </Head>

            <HomeContainer ref={sliderRef} className="keen-slider">
                {products.map(product => {
                    return (
                        <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                            <Product className="keen-slider__slide">
                                <Image src={product.imageUrl} width={520} height={480} alt=""/>

                                <footer>
                                    <strong>{product.name}</strong>
                                    <span>{product.price}</span>
                                    <Image src={BagIcon} alt="" onClick={() => addToCart(product)}/>
                                </footer>
                            </Product>
                        </Link>
                    )
                })}
            </HomeContainer>
        </>
       
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await stripe.products.list({
        expand: ['data.default_price']
    })

    const products = response.data.map(product => {
        const price = product.default_price as Stripe.Price

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR'
            }).format(price.unit_amount! / 100)
        }
    })

    return {
        props: {
            products
        },
        revalidate: 60 * 60 * 2 //every 2 hours that a user accesses this page, next will create a new version of this page
    }
}