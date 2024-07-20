import { AppProps } from "next/app"

import { CartProvider } from "@/context/CartContext"
import { Header } from "@/component/Header"
import Head from "next/head"

import { globalStyles } from "@/styles/global"
import { Container } from "@/styles/pages/app"

globalStyles()

function App({ Component, pageProps }: AppProps){

    return(
        <CartProvider>
            <Head>
                <link rel="shortcut icon" href="https://img.icons8.com/?size=48&id=80449&format=png" type="image/x-icon" />
            </Head>
            <Container>
                <Header/>
                <Component {...pageProps}/>
            </Container>
        </CartProvider>
    )
}

export default App