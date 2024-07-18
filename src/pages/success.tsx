import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import Link from "next/link";

export default function Success(){
    return(
        <SuccessContainer>
            <h1>Purchase made!</h1>

            <ImageContainer>
            
            </ImageContainer>

            <p><strong>Erika Perciliano</strong>, your <strong>Beyond the Limits T-Shirt</strong> is already on its way to your home.</p>
       
            <Link href='/'>
                Back to catalog
            </Link>
        </SuccessContainer>
    )
}