import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "./product"

export default function Product(){
    const { query } = useRouter()

    return(
       <ProductContainer>
        <ImageContainer>
            
        </ImageContainer>

        <ProductDetails>
            <h1>Shirt X</h1>
            <span> £ 29.90</span>

            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sint perspiciatis, rerum debitis non earum enim repudiandae eos in quasi beatae necessitatibus dolorem suscipit? Illum laudantium id quisquam facilis provident?
            </p>

            <button>Buy Now</button>
        </ProductDetails>
       </ProductContainer>
    )
}