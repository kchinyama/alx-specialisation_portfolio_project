/*
page/file that holds the users products page
*/

import { ProductCard, ProductCardSkeleton } from "@/components/ui/ProductsCard";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Suspense } from "react";

// function that stores all the products uploaded to our sit
const getProducts = cache(() => {
    return db.product.findMany({ where: 
        { isAvailableForPurchase: true }, 
        orderBy: { name: "asc" } })
}, ["/products", "getProduct"])


export default function ProductsPage() {
    return (
    <div className="pl-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={
                    <>
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                </>
                }
                >
                    <ProductsSuspense />
                </Suspense>                
            </div>
    )
}

// function that allows for the looping through all products so they can be displayed
async function ProductsSuspense() {
    const products = await getProducts()

    if (products.length === 0) {
        return <h1 className="pl-4">Sorry, no products available for purchase</h1>
    }
    
    return products.map(product => <ProductCard key={product.id} 
        {...product} />
    ) 
}