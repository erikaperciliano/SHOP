'use client'
import { usePathname } from "next/navigation"


export default function Product(){
    const pathname = usePathname()

    // Extract the ID from the pathname
    const pathSegments = pathname.split('/')
    const id = pathSegments[pathSegments.length - 1]

    return(
        <h1>Product: {JSON.stringify(id)}</h1>
    )
}