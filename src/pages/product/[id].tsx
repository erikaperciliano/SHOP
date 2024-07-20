import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"

import { GetStaticPaths, GetStaticProps } from "next"

import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import Image from "next/image"
import axios from "axios"
import { useState } from "react"
import Head from "next/head"
import { useCart } from "@/context/CartContext"

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string;
        defaultPriceId: string;
    }
}

export default function Product({ product }: ProductProps){
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    const { addToCart } = useCart(); // Uses the addToCart function from CartContext

    async function handleBuyProduct(){
        setIsCreatingCheckoutSession(true)

        try{
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId
            })

            const { checkoutUrl } = response.data;
            
            window.location.href = checkoutUrl
        }catch(err){
            setIsCreatingCheckoutSession(false)
            alert('Failed to redirect checkout')
        }
    }

    function handleAddToCart() {
        addToCart({
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price
        });

        console.log(product)
      }

    return(
        <>
            <Head>
                <title> {product.name} | SHOP</title>
            </Head>

            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="product image"/>
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>
                        {product.description}
                    </p>
                    <button disabled={isCreatingCheckoutSession} onClick={handleAddToCart}>Add to Cart</button>
                    {/*<button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Buy Now</button>*/}
                </ProductDetails>
            </ProductContainer>
        </>
      
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Search for best-selling products

    return {
        paths: [
            { params: { id: 'prod_QUXg4cfQ2G7NLc' }}
        ],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params?.id

    const product = await stripe.products.retrieve(productId!, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'EUR'
                }).format(price.unit_amount! / 100),
                description: product.description,
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 1 // 1hour
    }
}